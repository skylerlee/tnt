import type { App } from 'electron';

interface IAppLifecycle {
  setup(electronApp: App): void;
  teardown(): void;
}

class Application implements IAppLifecycle {
  setup(electronApp: App) {}

  teardown() {}
}

export default Application;
