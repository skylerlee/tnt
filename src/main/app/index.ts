import type { App } from 'electron';
import PtyManager from '../pty/pty-manager';

interface IAppLifecycle {
  setup(electronApp: App): void;
  teardown(): void;
}

class Application implements IAppLifecycle {
  private ptyManager: PtyManager;

  constructor() {
    this.ptyManager = new PtyManager();
  }

  setup(electronApp: App) {}

  teardown() {}
}

export default Application;
