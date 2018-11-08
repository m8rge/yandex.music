import path from 'path';
import displayNotification from './components/notification';
import registerMediaHotKeys from './components/hotkey'

const { app, BrowserWindow, Notification, ipcMain } = require('electron')

let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: false
    }
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.loadURL('https://music.yandex.ru/')

  registerMediaHotKeys(mainWindow);

  if (Notification.isSupported()) {
    ipcMain.on('trackChange', (event, artist, title, imageUrl) => {
      displayNotification(artist, title, imageUrl)
    })
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
})
// todo: exclude folders in result app