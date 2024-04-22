import { type App, BrowserWindow, ipcMain } from 'electron';
import { Term } from '~common/constants';
import type { IProfile, ITermSize } from '~common/typings';
import PtyManager, { type IPtyManager } from '../pty/pty-manager';

export interface IAppLifecycle {
  setup(electronApp: App): void;
  teardown(): void;
}

export interface IBroadcaster {
  broadcast(channel: string, ...args: unknown[]): void;
}

class Application implements IAppLifecycle, IBroadcaster {
  private ptyManager: IPtyManager = new PtyManager(this);

  setup(electronApp: App) {
    ipcMain.handle(Term.Open, async (e, id: number, profile: IProfile) => {
      this.ptyManager.attach(id, profile);
    });
    ipcMain.on(Term.Close, (e, id: number) => {
      this.ptyManager.detach(id);
    });
    ipcMain.on(Term.Write, (e, id: number, input: string) => {
      this.ptyManager.write(id, input);
    });
    ipcMain.on(Term.Resize, (e, id: number, size: ITermSize) => {
      this.ptyManager.resize(id, size);
    });
  }

  teardown() {}

  broadcast(channel: string, ...args: unknown[]) {
    for (const win of BrowserWindow.getAllWindows()) {
      win.webContents.emit(channel, ...args);
    }
  }
}

export default Application;
