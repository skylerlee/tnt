import type { IProfile } from './profile';

export interface IIpcAPI {
  openTerm(id: number, profile: IProfile): void;
  closeTerm(id: number): void;
}
