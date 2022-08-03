const { app, BrowserWindow } = require("electron");

require("@electron/remote/main").initialize();

function createWindow() {
    const window = new BrowserWindow({
        width: 1920,
        height: 1080,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    window.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);