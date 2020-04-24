"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Preload file that will be executed in the renderer process.
 * Note: This needs to be attached **prior to imports**, as imports
 * would delay the attachment till after the event has been raised.
 */
document.addEventListener('DOMContentLoaded', () => {
    injectScripts(); // eslint-disable-line @typescript-eslint/no-use-before-define
});
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const electron_1 = require("electron");
const INJECT_JS_PATH = path.join(__dirname, '..', 'inject/inject.js');
/**
 * Patches window.Notification to:
 * - set a callback on a new Notification
 * - set a callback for clicks on notifications
 * @param createCallback
 * @param clickCallback
 */
function setNotificationCallback(createCallback, clickCallback) {
    const OldNotify = window.Notification;
    const newNotify = (title, opt) => {
        createCallback(title, opt);
        const instance = new OldNotify(title, opt);
        instance.addEventListener('click', clickCallback);
        return instance;
    };
    newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
    Object.defineProperty(newNotify, 'permission', {
        get: () => OldNotify.permission,
    });
    // @ts-ignore
    window.Notification = newNotify;
}
function injectScripts() {
    const needToInject = fs.existsSync(INJECT_JS_PATH);
    if (!needToInject) {
        return;
    }
    // Dynamically require scripts
    require(INJECT_JS_PATH);
}
function notifyNotificationCreate(title, opt) {
    electron_1.ipcRenderer.send('notification', title, opt);
}
function notifyNotificationClick() {
    electron_1.ipcRenderer.send('notification-click');
}
setNotificationCallback(notifyNotificationCreate, notifyNotificationClick);
electron_1.ipcRenderer.on('params', (event, message) => {
    const appArgs = JSON.parse(message);
    console.info('nativefier.json', appArgs);
});
electron_1.ipcRenderer.on('debug', (event, message) => {
    console.info('debug:', message);
});
//# sourceMappingURL=preload.js.map