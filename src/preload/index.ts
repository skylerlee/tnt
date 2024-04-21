import { contextBridge, ipcRenderer } from 'electron';
import type { IIpcAPI } from '~common/typings';

class IpcAPI implements IIpcAPI {
  openTerm() {}

  closeTerm() {}
}

const ipcAPI = new IpcAPI();
contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);

declare global {
  interface Window {
    ipcAPI: IIpcAPI;
  }
}
