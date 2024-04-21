import { contextBridge, ipcRenderer } from 'electron';
import { Term } from '~common/constants';
import type { IIpcAPI, IProfile } from '~common/typings';
import type { IPayload } from '~main/pty/pty-manager';

const ipcAPI: IIpcAPI = {
  openTerm(id: number, profile: IProfile) {
    const payload: IPayload<IProfile> = {
      id,
      data: profile,
    };
    ipcRenderer.invoke(Term.Open, payload);
  },
  closeTerm(id: number) {
    const payload: IPayload<undefined> = {
      id,
    };
    ipcRenderer.emit(Term.Close, payload);
  },
};

contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);

declare global {
  interface Window {
    ipcAPI: IIpcAPI;
  }
}
