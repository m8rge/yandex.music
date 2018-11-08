import { globalShortcut, dialog } from 'electron'

function registerMediaHotKeys (mainWindow) {
  let ret

  const playPause = () => { mainWindow.webContents.send('playPause') }
  const nextTrack = () => { mainWindow.webContents.send('nextTrack') }
  const prevTrack = () => { mainWindow.webContents.send('prevPause') }

  ret = globalShortcut.register('MediaPlayPause', playPause)
  if (!ret) {
    dialog.showErrorBox('Cant bind global shortcut',
      'Cant bind MediaPlayPause')
  }

  ret = globalShortcut.register('MediaNextTrack', nextTrack)
  if (!ret) {
    dialog.showErrorBox('Cant bind global shortcut',
      'Cant bind MediaNextTrack')
  }

  ret = globalShortcut.register('MediaPreviousTrack', prevTrack)
  if (!ret) {
    dialog.showErrorBox('Cant bind global shortcut',
      'Cant bind MediaPreviousTrack')
  }
}

export default registerMediaHotKeys