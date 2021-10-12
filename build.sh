#!/usr/bin/env bash

nativefier --verbose --global-shortcuts shortcuts.json https://music.yandex.ru -n Yandex.Music -i ./og-image.png --internal-urls "(?:music|passport)\.yandex\.ru/.*"