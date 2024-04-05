import * as path from 'node:path';
import { BrowserWindow, app } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
    },
  });
  const appPath = app.getAppPath();
  console.log(appPath);
  win.loadFile(path.resolve(appPath, '..', 'renderer', 'index.html'));
}

function main() {
  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

main();
