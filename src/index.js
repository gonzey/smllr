const path = require('path');
const fs = require('fs');

let IS_LOCAL = true; // for Electron deployment
if (IS_LOCAL) var { app, BrowserWindow, shell } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (IS_LOCAL) if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

if (IS_LOCAL) var createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.webContents.on("new-window", function(event, url) {
        event.preventDefault();
        shell.openExternal(url);
    });

};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
if (IS_LOCAL) app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
if (IS_LOCAL) app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

if (IS_LOCAL) app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.