import { Term } from '@common/constants';
import { ipcMain } from 'electron';
import type { IPty } from 'node-pty';

export interface IPtyManager {
  attach(id: number, pty: IPty): void;
  detach(id: number): void;
}

class PtyManager implements IPtyManager {
  private ptys: Map<number, IPty>;

  attach(id: number, pty: IPty) {
    pty.onData((data) => {
      ipcMain.emit(Term.Read, {
        tid: id,
        data,
      });
    });
    pty.onExit((e) => {});
    this.ptys.set(id, pty);
  }

  detach(id: number) {
    this.ptys.delete(id);
  }
}

export default PtyManager;
