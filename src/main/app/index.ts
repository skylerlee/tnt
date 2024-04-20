import { Term } from '@common/constants';
import { type App, ipcMain } from 'electron';
import PtyManager from '../pty/pty-manager';

export interface IAppLifecycle {
  setup(electronApp: App): void;
  teardown(): void;
}

class Application implements IAppLifecycle {
  private ptyManager: PtyManager;

  constructor() {
    this.ptyManager = new PtyManager();
  }

  setup(electronApp: App) {
    ipcMain.on(Term.Open, () => {});
    ipcMain.on(Term.Write, () => {});
    ipcMain.on(Term.Resize, () => {});
  }

  teardown() {}
}

export default Application;
