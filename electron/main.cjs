const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

const appRoot = path.join(__dirname, "..");
const previewHtml = path.join(appRoot, "public", "index.html");

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1220,
    height: 860,
    minWidth: 920,
    minHeight: 680,
    title: "Expo Phone Preview",
    backgroundColor: "#f7f5ef",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.loadFile(previewHtml);

  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  return window;
}

app.setName("Expo Phone Preview");

if (process.platform === "win32") {
  app.setAppUserModelId("com.danicasellas.expophonepreview");
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
