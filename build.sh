#!/usr/bin/env bash

./node_modules/.bin/nativefier https://music.yandex.ru \
  --single-instance \
  --name Yandex.Music \
  --icon ./og-image.png \
  --electron-version 15.0.0 \
  --inject ./renderer.js \
  --inject ./style.css \
  --width 1280px \
  --height 800px \
  --fast-quit \
  --title-bar-style 'hiddenInset' \
  --darwin-dark-mode-support \
  --internal-urls "(?:music|passport)\.yandex\.ru/.*"

#  --version 0.1.1
  #  --portable \

#  --disable-context-menu \
#  --disable-dev-tools
  # --global-shortcuts ./shortcuts.json \
