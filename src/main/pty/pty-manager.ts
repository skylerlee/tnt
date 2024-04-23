import { type IPty, spawn } from 'node-pty';
import { Term } from '~common/constants';
import type { IProfile, ITermSize } from '~common/typings';
import type { IBroadcaster } from '~main/app';

export interface IPtyManager {
  attach(id: number, profile: IProfile): void;
  detach(id: number): void;
  write(id: number, input: string): void;
  resize(id: number, size: ITermSize): void;
}

class PtyManager implements IPtyManager {
  private ptys = new Map<number, IPty>();
  private broadcaster: IBroadcaster;

  constructor(broadcaster: IBroadcaster) {
    this.broadcaster = broadcaster;
  }

  attach(id: number, profile: IProfile) {
    const { shell, cwd, initialSize } = profile;
    const pty = spawn(shell, [], {
      cwd,
      cols: initialSize.cols,
      rows: initialSize.rows,
    });
    pty.onData((data) => {
      this.broadcaster.broadcast(Term.Read, id, data);
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

  write(id: number, input: string) {
    const pty = this.ptys.get(id);
    if (pty === undefined) {
      return;
    }
    pty.write(input);
  }

  resize(id: number, size: ITermSize) {
    const pty = this.ptys.get(id);
    if (pty === undefined) {
      return;
    }
    const { cols, rows } = size;
    pty.resize(cols, rows);
  }
}

export default PtyManager;
