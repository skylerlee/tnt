import type { IProfile } from './profile';
import type { ITermHandle } from './term';

export interface IIpcAPI {
  openTerm(id: number, profile: IProfile): Promise<ITermHandle>;
  closeTerm(id: number): void;
}
