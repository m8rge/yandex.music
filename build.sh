#!/usr/bin/env bash

args=""
if [[ $(uname -p) == 'arm' ]]; then
  args="-a arm64"
  echo "Building for ARM"
fi
nativefier --disable-old-build-warning-yesiknowitisinsecure --verbose --global-shortcuts shortcuts.json https://music.yandex.ru -n Yandex.Music -i ./og-image.png --internal-urls "(?:music|passport)\.yandex\.ru/.*" $args