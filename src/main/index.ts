import * as path from 'node:path';
import { BrowserWindow, app } from 'electron';
import Application from './app';

function createWindow() {
  const appPath = app.getAppPath();
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.resolve(appPath, 'preload', 'index.js'),
    },
  });
  win.loadFile(path.resolve(appPath, 'renderer', 'index.html'));
  win.once('ready-to-show', () => {
    win.show();
  });
}

function main() {
  const application = new Application();

  app.whenReady().then(() => {
    application.setup(app);
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

  app.on('quit', () => {
    application.teardown();
  });
}

main();
