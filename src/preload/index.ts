import { contextBridge, ipcRenderer } from 'electron';
import { Term } from '~common/constants';
import type { IIpcAPI, IProfile } from '~common/typings';

const ipcAPI: IIpcAPI = {
  openTerm(id: number, profile: IProfile): Promise<boolean> {
    return ipcRenderer.invoke(Term.Open, id, profile);
  },
  closeTerm(id: number) {
    ipcRenderer.emit(Term.Close, id);
  },
};

contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);

declare global {
  interface Window {
    ipcAPI: IIpcAPI;
  }
}
