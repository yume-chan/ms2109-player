# Web Player for MacroSilicon MS2109 Capture Cards

I recently bought a cheap (65CNY/~10USD) capture card with MS2109 chip to play Switch games on my monitor without an HDMI switch (no pun intended).

## Vendor/Product ID

* VID: 534d
* PID: 2109
* REV: 2100

## Spec

* Video Output: 1080p@60fps (may drop to 1080p@25fps when connected to a USB hub)
* Audio Output: mono 16bit 96KHz (some forum posts say it supports stereo, but I can't get it to work on Windows)

## Web Player

Normally I use OBS to stream the video, but requiring opening it everytime (and setting it up when port changed) is a pain. So I made this simple Web player.

### Notes

1. Because sometimes it can only output 1080p@25fps, the player will try 60fps first and fall back to 25fps if failed.
2. Only tested on Chrome (Microsoft Edge) on Windows 10. Due to the specific method for finding the device, it may fail on other browsers/OSes.
