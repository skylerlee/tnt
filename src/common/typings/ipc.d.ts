import type { IDisposable } from '~common/utils/disposable';
import type { IProfile } from './profile';
import type { ITermSize } from './term';

export interface IIpcAPI {
  openTerm(id: number, profile: IProfile): Promise<boolean>;
  closeTerm(id: number): void;
  writeTerm(id: number, input: string): void;
  resizeTerm(id: number, size: ITermSize): void;
  onReadTerm(id: number, listener: (data: string) => void): IDisposable;
}
