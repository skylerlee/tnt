import { type App, ipcMain } from 'electron';
import { Term } from '~common/constants';
import type { IProfile, ITermSize } from '~common/typings';
import PtyManager, { type IPtyManager } from '../pty/pty-manager';

export interface IAppLifecycle {
  setup(electronApp: App): void;
  teardown(): void;
}

class Application implements IAppLifecycle {
  private ptyManager: IPtyManager = new PtyManager();

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
}

export default Application;
