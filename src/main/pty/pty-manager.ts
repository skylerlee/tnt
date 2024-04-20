import { Term } from '@common/constants';
import type { IProfile, ITermSize } from '@common/typings';
import { ipcMain } from 'electron';
import { type IPty, spawn } from 'node-pty';

export interface IPayload {
  id: number;
  data: string | IProfile | ITermSize;
}

export interface IPtyManager {
  attach(id: number, profile: IProfile): void;
  detach(id: number): void;
  dispatch(channel: string, payload: IPayload): void;
}

class PtyManager implements IPtyManager {
  private ptys: Map<number, IPty>;

  attach(id: number, profile: IProfile) {
    const { shell, cwd } = profile;
    const pty = spawn(shell, [], {
      cwd,
    });
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
    const pty = this.ptys.get(id);
    if (pty === undefined) {
      return;
    }
    pty.kill();
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
      case Term.Open: {
        this.attach(payload.id, payload.data as IProfile);
        break;
      }
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
