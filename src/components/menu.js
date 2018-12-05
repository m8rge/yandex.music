const { Menu, shell, clipboard, app, BrowserWindow, dialog } = require('electron')

const withFocusedWindow = (block) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    return block(focusedWindow);
  }
  return undefined;
};

const ZOOM_INTERVAL = 0.1;

const adjustWindowZoom = (window, adjustment) => {
  window.webContents.getZoomFactor((zoomFactor) => {
    window.webContents.setZoomFactor(zoomFactor + adjustment);
  });
};

const zoomIn = () => {
  withFocusedWindow((focusedWindow) =>
    adjustWindowZoom(focusedWindow, ZOOM_INTERVAL),
  );
};

const zoomOut = () => {
  withFocusedWindow((focusedWindow) =>
    adjustWindowZoom(focusedWindow, -ZOOM_INTERVAL),
  );
};

const zoomReset = () => {
  withFocusedWindow((focusedWindow) => {
    focusedWindow.webContents.setZoomFactor(1);
  });
};

const clearAppData = (mainWindow, homeUrl) => {
  dialog.showMessageBox(
    mainWindow,
    {
      type: 'warning',
      buttons: ['Yes', 'Cancel'],
      defaultId: 1,
      title: 'Clear cache confirmation',
      message:
        'This will clear all data (cookies, local storage etc) from this app. Are you sure you wish to proceed?',
    },
    (response) => {
      if (response !== 0) {
        return;
      }
      const { session } = mainWindow.webContents;
      session.clearStorageData(() => {
        session.clearCache(() => {
          mainWindow.loadURL(homeUrl);
        });
      });
    },
  );
};

const goBack = () => {
  withFocusedWindow((focusedWindow) => {
    focusedWindow.webContents.goBack();
  });
};

const goForward = () => {
  withFocusedWindow((focusedWindow) => {
    focusedWindow.webContents.goForward();
  });
};

const getCurrentUrl = () =>
  withFocusedWindow((focusedWindow) => focusedWindow.webContents.getURL());

function createMenu(mainWindow) {
  if (Menu.getApplicationMenu()) {
    return;
  }

  const template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo',
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut',
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy',
        },
        {
          label: 'Copy Current URL',
          accelerator: 'CmdOrCtrl+L',
          click: () => {
            const currentURL = getCurrentUrl();
            clipboard.writeText(currentURL);
          },
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste',
        },
        {
          label: 'Paste and Match Style',
          accelerator: 'CmdOrCtrl+Shift+V',
          role: 'pasteandmatchstyle',
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall',
        },
        {
          label: 'Clear App Data',
          click: () => {
            clearAppData(mainWindow, homeUrl);
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+[',
          click: () => {
            goBack();
          },
        },
        {
          label: 'Forward',
          accelerator: 'CmdOrCtrl+]',
          click: () => {
            goForward();
          },
        },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Ctrl+Command+F';
            }
            return 'F11';
          })(),
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          },
        },
        {
          label: 'Zoom In',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Command+=';
            }
            return 'Ctrl+=';
          })(),
          click: () => {
            zoomIn();
          },
        },
        {
          label: 'Zoom Out',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Command+-';
            }
            return 'Ctrl+-';
          })(),
          click: () => {
            zoomOut();
          },
        },
        {
          label: 'Reset Zoom',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Command+0';
            }
            return 'Ctrl+0';
          })(),
          click: () => {
            zoomReset();
          },
        },
      ],
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
      ],
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: `Built with Nativefier`,
          click: () => {
            shell.openExternal('https://github.com/jiahaog/nativefier');
          },
        },
        {
          label: 'Report an Issue',
          click: () => {
            shell.openExternal('https://github.com/jiahaog/nativefier/issues');
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: 'Electron',
      submenu: [
        {
          label: 'Services',
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          label: 'Hide App',
          accelerator: 'Command+H',
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    });
    template[3].submenu.push(
      {
        type: 'separator',
      },
      {
        label: 'Bring All to Front',
        role: 'front',
      },
    );
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

export default createMenu;
