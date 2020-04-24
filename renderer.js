const { app, globalShortcut,systemPreferences } = require('electron').remote

app.whenReady().then(() => {
const isTrusted = systemPreferences.isTrustedAccessibilityClient(true);

  if (!globalShortcut.isRegistered('MediaPlayPause')) {
    globalShortcut.register('MediaPlayPause', () => {
      if (!externalAPI.isPlaying()) {
        externalAPI.play();
      } else {
        externalAPI.togglePause();
      }
    })
  }

  if (!globalShortcut.isRegistered('MediaNextTrack')) {
    globalShortcut.register('MediaNextTrack', () => {
      externalAPI.next();
    })
  }

  if (!globalShortcut.isRegistered('MediaPreviousTrack')) {
    globalShortcut.register('MediaPreviousTrack', () => {
      if (externalAPI.getProgress().position >= 5) {
        externalAPI.setPosition(0);
      } else {
        externalAPI.prev();
      }
    })
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
