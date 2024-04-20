import type { IpcRendererEvent } from 'electron';

export interface IIpcAPI {
  openTerm(): void;
  closeTerm(): void;
}
