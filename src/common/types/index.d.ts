import type { IpcRendererEvent } from 'electron';

export interface IIpcAPI {
  // biome-ignore lint/suspicious/noExplicitAny: generic any type
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void;
  // biome-ignore lint/suspicious/noExplicitAny: generic any type
  off: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void;
  // biome-ignore lint/suspicious/noExplicitAny: generic any type
  send: (channel: string, ...args: any[]) => void;
  // biome-ignore lint/suspicious/noExplicitAny: generic any type
  invoke: (channel: string, ...args: any[]) => Promise<any>;
}

declare global {
  interface Window {
    ipcAPI: IIpcAPI;
  }
}
