import path from 'path'
import displayNotification from './components/notification'
import registerMediaHotKeys from './components/hotkey'
import createMenu from './components/menu'

const { app, BrowserWindow, Notification, ipcMain, dialog } = require('electron')

let mainWindow = null
let shouldQuit = false
const homeUrl = 'https://music.yandex.ru/'

const isOSX = () => { return process.platform === 'darwin' }

const createWindow = () => {
  const windowStateKeeper = require('electron-window-state');
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 768
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: false
    }
  })

  mainWindowState.manage(mainWindow);

  createMenu(mainWindow, homeUrl);

  mainWindow.on('close', (event) => {
    if (isOSX() && !shouldQuit) {
      event.preventDefault();
      mainWindow.hide();
    } else {
      mainWindow = null
    }
  })

  mainWindow.loadURL(homeUrl)

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
  shouldQuit = true
});