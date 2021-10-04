# Web Player for MacroSilicon MS2109 Capture Cards

I recently bought a cheap (65CNY/~10USD) capture card with MS2109 chip to play Switch games on my monitor without an HDMI switch (no pun intended).

## Hardware ID

|  VID  |  PID  |  REV  |
| :---: | :---: | :---: |
| 534d  | 2109  | 2100  |

## Spec

|                      |                         | Note                                                |
| -------------------- | ----------------------- | --------------------------------------------------- |
| Video Input          | 4K 30FPS / 1080P 60FPS  |                                                     |
| Video Output (MJPEG) | 1080P 60FPS             | May drop to 1080P 25FPS when connected to a USB Hub |
| Video Output (YUY2)  | 1080P 5FPS / 720P 10FPS |                                                     |
| Audio Output (LPCM)  | Mono 16bit 96KHz        | It's actually stereo 16bit 48KHz, interleaved       |

## Use with OBS

1. Every time you remove and re-plug the device, you must re-select the "Device" in each source (or re-create all sources).
2. If 1080P 60FPS MJPEG doesn't work (black screen), try 25FPS or another USB port. Set "Resolution" to "Highest FPS" won't work either.
3. "Audio Output Mode" option in "Video Capture Device" can be very laggy, to reduce lag:
   1. Add an "Audio Input Capture" source
   2. Set "Device" to "Digital Audio Interface (*X*- USB Digital Audio)" (where *X* may be any number)
   3. Open "Edit" -> "Advanced Audio Properties" menu, set "Audio Monitoring" to "Monitor Only" or "Monitor and Output" (depends on your usage)
4. If you want to use YUY2 (high quality, low FPS) but can't find it in "Video Format", first set "FPS" to "Highest FPS" or 720P 10FPS, now you should see it.
5. For stereo audio: (source: https://www.youtube.com/watch?v=R4SXJMNywL4&lc=Ugwu3DawGg791wTcold4AaABAg)
    * Linux: Linux kernel has a patch to do this automatically.
    * Windows: https://github.com/ToadKing/mono-to-stereo
    * macOS: https://github.com/kunichiko/MS2109-mono-to-stereo-mac
    * I didn't test the above two, but they should replace "Audio Output Mode" or "Audio Input Capture" in 2.

## Use with Web Player

Or you can use this web player:

* No need to install OBS
* No need to reconfigure after every reconnect
* Low CPU usage
* Automatically detect hightest FPS (60 vs 25)
* Automatically convert audio to stereo

However

* It only support 1080P resolution
* It only support MJPEG format
* Only tested on Chrome (Microsoft Edge) on Windows 10. Due to the specific method for finding the device, it may fail on other browsers/OSes
