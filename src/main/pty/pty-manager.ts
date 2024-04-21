import { ipcMain } from 'electron';
import { type IPty, spawn } from 'node-pty';
import { Term } from '~common/constants';
import type { IProfile, ITermSize } from '~common/typings';

type Param = string | IProfile | ITermSize;

export interface IPayload<T extends Param> {
  id: number;
  data: T;
}

export interface IPtyManager {
  attach(id: number, profile: IProfile): void;
  detach(id: number): void;
  dispatch<T extends Param>(channel: string, payload: IPayload<T>): void;
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

  dispatch<T extends Param>(channel: string, payload: IPayload<T>) {
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
