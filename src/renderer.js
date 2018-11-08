'use strict'

const { ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', function () {
  ipcRenderer.on('playPause', () => {
    externalAPI.togglePause()
  })

  ipcRenderer.on('nextTrack', () => {
    externalAPI.next()
  })

  ipcRenderer.on('prevTrack', () => {
    if (externalAPI.getProgress().position >= 5) {
      externalAPI.setPosition(0)
    } else {
      externalAPI.prev()
    }
  })

  externalAPI.on(externalAPI.EVENT_TRACK, () => {
    let currentTrack = externalAPI.getCurrentTrack()
    let imageUrl = 'https://' + currentTrack.cover.replace('%%', '100x100')
    ipcRenderer.send('trackChange', currentTrack.artists[0].title,
      currentTrack.title, imageUrl)
  })
})
