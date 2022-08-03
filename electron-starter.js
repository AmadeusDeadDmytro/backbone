const { app, BrowserWindow } = require("electron");

require("@electron/remote/main").initialize();

function createWindow() {
    const window = new BrowserWindow({
        width: 1920,
        height: 1080,
        resizable: false,
        autoHideMenuBar: true,
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    window.setResizable(false);

    window.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);