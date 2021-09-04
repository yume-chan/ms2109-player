import { useCallback } from 'react';
import styles from './App.module.css';

function App() {
  const handleVideoRef = useCallback(async (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      await window.navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const devices = await window.navigator.mediaDevices.enumerateDevices();
      const video = devices.find(x => x.kind === 'videoinput' && x.label.endsWith('(534d:2109)'));
      const audio = devices.find(x => x.kind === 'audioinput' && x.label.endsWith('(534d:2109)'));
      let stream;
      try {
        stream = await window.navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: video!.deviceId },
            width: { exact: 1920 },
            height: { exact: 1080 },
            frameRate: { exact: 60 },
          },
          audio: {
            groupId: {
              exact: audio!.groupId
            }
          },
        });
      } catch {
        stream = await window.navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: video!.deviceId },
            width: { exact: 1920 },
            height: { exact: 1080 },
            frameRate: { exact: 60 },
          },
          audio: {
            groupId: {
              exact: audio!.groupId
            }
          },
        });
      }
      videoElement.srcObject = stream;
    }
  }, []);

  return (
    <video className={styles.video} ref={handleVideoRef} autoPlay controls></video>
  );
}

export default App;
