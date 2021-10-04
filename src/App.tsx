import { useCallback } from 'react';
import styles from './App.module.css';

const MODE_LIST = [
  { width: 1920, height: 1080, frameRate: 60 },
  // MS2109 may output 25FPS when connected to a USB hub
  { width: 1920, height: 1080, frameRate: 25 },
];

async function requestMediaDevicePermission() {
  // request any media device to trigger the permission popup
  const stream = await window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  // stop all tracks so they can be requested again
  for (const track of stream.getTracks()) {
    track.stop();
  }
}

function findDevice(devices: MediaDeviceInfo[], type: 'videoinput' | 'audioinput', vid: string, pid: string): MediaDeviceInfo | undefined {
  // Spec doesn't define how to find a device with specified VID/PID
  // Chrome appends (vid:pid) to the device label
  // TODO: make sure it works on Firefox/Safari
  return devices.find(
    x =>
      x.kind === type &&
      x.label.endsWith(`(${vid.toLowerCase()}:${pid.toLowerCase()})`)
  );
}

function App() {
  const handleVideoRef = useCallback(async (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      // Only `getUserMedia` triggers the permission popup, `enumerateDevices` won't
      await requestMediaDevicePermission();

      // TODO: handle permission rejected

      const devices = await window.navigator.mediaDevices.enumerateDevices();
      const videoDevice = findDevice(devices, 'videoinput', '534d', '2109');
      const audioDevice = findDevice(devices, 'audioinput', '534d', '2109');

      // TODO: handle device not found

      for (const mode of MODE_LIST) {
        try {
          const videoStream = await window.navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: videoDevice!.deviceId },
              width: { exact: mode.width },
              height: { exact: mode.height },
              frameRate: { exact: mode.frameRate },
            },
          });
          videoElement.srcObject = videoStream;

          const audioStream = await window.navigator.mediaDevices.getUserMedia({
            audio: {
              groupId: { exact: audioDevice!.groupId },
              sampleRate: 96_000,
              sampleSize: 16,
            },
          });

          const context = new AudioContext({ sampleRate: 96_000 });
          const source = context.createMediaStreamSource(audioStream);
          await context.audioWorklet.addModule('data:application/javascript;charset=utf8,' + encodeURIComponent(`
            class SplitProcessor extends AudioWorkletProcessor {
              process (inputs, outputs, parameters) {
                const input = inputs[0][0];
                const leftOutput = outputs[0][0];
                const rightOutput = outputs[0][1];

                let i = 0;
                while (i < input.length) {
                  leftOutput[i] = input[i + 1];
                  leftOutput[i + 1] = input[i + 1];

                  rightOutput[i] = input[i];
                  rightOutput[i + 1] = input[i];

                  i += 2;
                }

                return true;
              }
            }

            registerProcessor('split-processor', SplitProcessor)
          `));
          const processor = new AudioWorkletNode(context, 'split-processor', {
            numberOfInputs: 1,
            numberOfOutputs: 1,
          });
          source.connect(processor);
          processor.connect(context.destination);
          break;
        } catch (e) {
          console.error(e);
          // ignore
        }
      }
    }
  }, []);

  return (
    <video className={styles.video} ref={handleVideoRef} autoPlay />
  );
}

export default App;
