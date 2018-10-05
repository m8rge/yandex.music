#!/usr/bin/env bash

nativefier https://music.yandex.ru --single-instance -n Yandex.Music -i ./og-image.png --inject ./renderer.js --internal-urls "(?:music|passport)\.yandex\.ru/.*" --inject style.css --title-bar-style 'hiddenInset'