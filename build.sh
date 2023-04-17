#!/usr/bin/env bash

args=""

if [[ $(uname -p) == 'arm' ]]; then
  args="-a arm64"
  echo "Building for ARM"
fi

./node_modules/.bin/nativefier https://music.yandex.ru \
  --single-instance \
  --disable-old-build-warning-yesiknowitisinsecure \
  --verbose \
  --name Yandex.Music \
  --icon ./og-image.png \
  --width 1280px \
  --height 800px \
  --electron-version 22.3.6 \
  --inject ./renderer.js \
  --inject ./style.css \
  --fast-quit \
  --title-bar-style 'hiddenInset' \
  --darwin-dark-mode-support \
  --internal-urls "(?:music|passport)\.yandex\.ru/.*" \
  --disable-dev-tools \
  --disable-context-menu \
  -v 0.2.0 \
  $args

#  --portable \

#  --disable-context-menu \
#  --disable-dev-tools
# --global-shortcuts ./shortcuts.json \
