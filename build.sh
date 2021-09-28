#!/usr/bin/env bash

./node_modules/.bin/nativefier https://music.yandex.ru \
  --single-instance \
  --name Yandex.Music \
  --icon ./og-image.png \
  --inject ./renderer.js \
  --inject ./style.css \
  --width 1280px \
  --height 800px \
  --single-instance \
  --fast-quit \
  --portable \
  --title-bar-style 'hiddenInset' \
  --internal-urls "(?:music|passport)\.yandex\.ru/.*" \
  --darwin-dark-mode-support \
  --disable-context-menu \
  --disable-dev-tools \

  # --global-shortcuts ./shortcuts.json \
