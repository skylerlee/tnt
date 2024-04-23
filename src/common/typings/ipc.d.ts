import type { IProfile } from './profile';

export interface IIpcAPI {
  openTerm(id: number, profile: IProfile): Promise<boolean>;
  closeTerm(id: number): void;
}
