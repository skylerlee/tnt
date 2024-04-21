import { contextBridge, ipcRenderer } from 'electron';
import { Term } from '~common/constants';
import type { IIpcAPI, IProfile, ITermHandle } from '~common/typings';

const ipcAPI: IIpcAPI = {
  openTerm(id: number, profile: IProfile): Promise<ITermHandle> {
    return ipcRenderer.invoke(Term.Open, id, profile).then(() => {
      return {
        title: '',
        onRead: (listener: (data: string) => void) => {
          ipcRenderer.on(Term.Read, (e, tid: number, data: string) => {
            if (tid === id) {
              listener(data);
            }
          });
        },
      };
    });
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
