import path from 'path';
import displayNotification from './components/notification';
import registerMediaHotKeys from './components/hotkey'

const { app, BrowserWindow, Notification, ipcMain } = require('electron')

let mainWindow = null

const isOSX = () => { return process.platform === 'darwin' }

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: false
    }
  })

  mainWindow.on('close', (event, a) => {
    if (isOSX()) {
      event.preventDefault();
      mainWindow.hide();
    } else {
      mainWindow = null
    }
  })

  mainWindow.loadURL('https://music.yandex.ru/')

  registerMediaHotKeys(mainWindow);

  if (Notification.isSupported()) {
    ipcMain.on('trackChange', (event, artist, title, imageUrl) => {
      displayNotification(artist, title, imageUrl)
    })
  }
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
}

app.on('ready', createWindow)

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
  }
})

app.on('window-all-closed', () => {
  if (!isOSX()) {
    app.quit();
  }
})

app.on('activate', (event, hasVisibleWindows) => {
  if (isOSX() && !hasVisibleWindows) {
    mainWindow.show();
  }
})

app.on('before-quit', () => {
  if (isOSX()) {
    // todo: deal with exception on exit
    app.exit(0);
  }
});