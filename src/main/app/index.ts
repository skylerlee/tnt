import { type App, ipcMain } from 'electron';
import { Term } from '~common/constants';
import PtyManager, { type IPtyManager } from '../pty/pty-manager';

export interface IAppLifecycle {
  setup(electronApp: App): void;
  teardown(): void;
}

class Application implements IAppLifecycle {
  private ptyManager: IPtyManager;

  constructor() {
    this.ptyManager = new PtyManager();
  }

  setup(electronApp: App) {
    ipcMain.on(Term.Open, (e, payload) => {
      this.ptyManager.dispatch(Term.Open, payload);
    });
    ipcMain.on(Term.Write, (e, payload) => {
      this.ptyManager.dispatch(Term.Write, payload);
    });
    ipcMain.on(Term.Resize, (e, payload) => {
      this.ptyManager.dispatch(Term.Resize, payload);
    });
  }

  teardown() {}
}

export default Application;
