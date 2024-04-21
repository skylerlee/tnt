import { type App, ipcMain } from 'electron';
import { Term } from '~common/constants';
import type { IProfile, ITermSize } from '~common/typings';
import PtyManager, { type IPayload, type IPtyManager } from '../pty/pty-manager';

export interface IAppLifecycle {
  setup(electronApp: App): void;
  teardown(): void;
}

class Application implements IAppLifecycle {
  private ptyManager: IPtyManager = new PtyManager();

  setup(electronApp: App) {
    ipcMain.handle(Term.Open, async (e, payload: IPayload<IProfile>) => {
      this.ptyManager.attach(payload.id, payload.data);
    });
    ipcMain.on(Term.Close, (e, payload: IPayload<undefined>) => {
      this.ptyManager.detach(payload.id);
    });
    ipcMain.on(Term.Write, (e, payload: IPayload<string>) => {
      this.ptyManager.dispatch(Term.Write, payload);
    });
    ipcMain.on(Term.Resize, (e, payload: IPayload<ITermSize>) => {
      this.ptyManager.dispatch(Term.Resize, payload);
    });
  }

  teardown() {}
}

export default Application;
