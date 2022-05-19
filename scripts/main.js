const { app, globalShortcut, BrowserWindow } = require("electron");

let isFullScreen = false;

app.commandLine.appendSwitch("enable-features", "VaapiVideoDecoder");

async function createWindow() {
    const mainWindow = new BrowserWindow({
        fullscreenable: true,
        webPreferences: {
            contextIsolation: false,
            nativeWindowOpen: false,
            // userAgent: userAgent
        },
    });

    mainWindow.loadURL("https://music.yandex.ru");

    globalShortcut.register("F12", async () => {
        mainWindow.webContents.toggleDevTools();
    });

    /* uncomment this to debug any errors with loading page
    mainWindow.webContents.on("will-navigate", (event, url) => {
      console.log("will-navigate", url);
      event.preventDefault();
    }); */
}

app.whenReady().then(async () => {
    createWindow();

    app.on("activate", async function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    globalShortcut.register("Super+F", async () => {
        isFullScreen = BrowserWindow.getAllWindows()[0].isFullScreen();
        if (isFullScreen) {
            BrowserWindow.getAllWindows()[0].setFullScreen(false);
            isFullScreen = false;
        } else {
            BrowserWindow.getAllWindows()[0].setFullScreen(true);
            isFullScreen = true;
        }
    });

    globalShortcut.register("F11", async () => {
        isFullScreen = BrowserWindow.getAllWindows()[0].isFullScreen();
        if (isFullScreen) {
            BrowserWindow.getAllWindows()[0].setFullScreen(false);
            isFullScreen = false;
        } else {
            BrowserWindow.getAllWindows()[0].setFullScreen(true);
            isFullScreen = true;
        }
    });

    globalShortcut.register("Alt+F4", async () => {
        app.quit();
    });

    globalShortcut.register("F4", async () => {
        app.quit();
    });
});

app.on("browser-window-created", async function (e, window) {
    window.setBackgroundColor("#1A1D1F");
    window.setMenu(null);
});

app.on("will-quit", async () => {
    globalShortcut.unregisterAll();
});

app.on("window-all-closed", async function () {
    if (process.platform !== "darwin") {
        app.quit();
    };
});
