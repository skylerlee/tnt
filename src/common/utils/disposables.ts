export interface IDisposable {
  dispose(): void;
}

export class Disposables implements IDisposable {
  protected _disposables: IDisposable[] = [];
  protected _isDisposed = false;

  /**
   * Disposes the object, triggering the `dispose` method on all registered IDisposables.
   */
  public dispose(): void {
    this._isDisposed = true;
    for (const d of this._disposables) {
      d.dispose();
    }
    this._disposables.length = 0;
  }

  /**
   * Registers a disposable object.
   * @param d The disposable to register.
   * @returns The disposable.
   */
  public register<T extends IDisposable>(d: T): T {
    this._disposables.push(d);
    return d;
  }

  /**
   * Unregisters a disposable object if it has been registered, if not do
   * nothing.
   * @param d The disposable to unregister.
   */
  public unregister<T extends IDisposable>(d: T): void {
    const index = this._disposables.indexOf(d);
    if (index !== -1) {
      this._disposables.splice(index, 1);
    }
  }
}
