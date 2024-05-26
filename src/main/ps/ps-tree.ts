import * as childProcess from 'node:child_process';
import { type ObservableInput, from, map } from 'rxjs';

export interface IProcessInfo {
  pid: number;
  name: string;
  memory?: number;
  commandLine?: string;
  children: IProcessInfo[];
}

export async function getPsTree(pid: number): Promise<IProcessInfo | undefined> {
  if (process.platform === 'win32') {
    // Use native `ps` module on Windows
    const windowsProcessTree = await import('@vscode/windows-process-tree');
    return new Promise((resolve) => {
      windowsProcessTree.getProcessTree(pid, resolve);
    });
  }
  // Spawn `ps` on Unix/Darwin
  const cp = childProcess.spawn('ps', ['-A', '-o', 'ppid,pid,comm']);
  from(cp.stdout as ObservableInput<Buffer>)
    .pipe(
      // Parse `ps` output
      map((chunk) => {
        const line = chunk.toString('utf-8');
        return line;
      }),
    )
    .subscribe({
      next: (line) => {
        console.log(':', line);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('-- end --');
      },
    });
  return {
    pid,
    name: '?',
    children: [],
  };
}
