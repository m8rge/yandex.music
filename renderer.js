'use strict';
const {globalShortcut, dialog} = require('electron').remote;
const currentWindow = require('electron').remote.getCurrentWindow();
const currentWebContents = currentWindow.webContents;

const init = () => {
    if (window.location.host !== 'music.yandex.ru') {
        return;
    }

    var ret;

    ret = globalShortcut.register('MediaPlayPause', () => {
        externalAPI.togglePause();
    });
    if (!ret) {
        dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaPlayPause. Closing tab.\nPossible second opened tab?');
        currentWindow.close();
        return;
    }

    ret = globalShortcut.register('MediaNextTrack', () => {
        externalAPI.next();
    });
    if (!ret) {
        dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaNextTrack. Closing tab. \nPossible second opened tab?');
        currentWindow.close();
        return;
    }

    ret = globalShortcut.register('MediaPreviousTrack', () => {
        externalAPI.prev();
    });
    if (!ret) {
        dialog.showErrorBox('Cant bind global shortcut', 'Cant bind MediaPreviousTrack. Closing tab. \nPossible second opened tab?');
        currentWindow.close();
    }
};

currentWebContents.on('did-finish-load', init);
