import { Term } from '@common/constants';
import { ipcMain } from 'electron';
import type { IPty } from 'node-pty';

export interface ITermSize {
  columns: number;
  rows: number;
}

export interface IPayload {
  id: number;
  data: string | ITermSize;
}

export interface IPtyManager {
  attach(id: number, pty: IPty): void;
  detach(id: number): void;
  dispatch(channel: string, payload: IPayload): void;
}

class PtyManager implements IPtyManager {
  private ptys: Map<number, IPty>;

  attach(id: number, pty: IPty) {
    pty.onData((data) => {
      ipcMain.emit(Term.Read, {
        id,
        data,
      });
    });
    pty.onExit((e) => {});
    this.ptys.set(id, pty);
  }

  detach(id: number) {
    this.ptys.delete(id);
  }

  dispatch(channel: string, payload: IPayload) {
    if (!payload.id) {
      return;
    }
    const pty = this.ptys.get(payload.id);
    if (pty === undefined) {
      return;
    }
    switch (channel) {
      case Term.Write: {
        pty.write(payload.data as string);
        break;
      }
      case Term.Resize: {
        const { columns, rows } = payload.data as ITermSize;
        pty.resize(columns, rows);
        break;
      }
    }
  }
}

export default PtyManager;
