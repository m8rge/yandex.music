const { app, globalShortcut, systemPreferences, Notification } = require('electron').remote
//const notifier = require('node-notifier')

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


  	externalAPI.on(externalAPI.EVENT_TRACK, () => {
  		const trackInfo = externalAPI.getCurrentTrack();
  		const artists = trackInfo.artists.map(function(obj) { return obj.title; }).join(', ');

  		new Notification('Яндекс.Музыка', {
  			silent: true,
  			body: `Album: ${trackInfo.album.title} (${trackInfo.album.year})\r\nTrack: ${artists} - ${trackInfo.title}`
  		});

  		//app.dock.setBadge('');
  	})

})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
