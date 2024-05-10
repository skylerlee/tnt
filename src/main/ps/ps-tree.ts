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
  // Spawn and parse `ps` output on Unix/Darwin
  return {
    pid,
    name: '?',
    children: [],
  };
}
