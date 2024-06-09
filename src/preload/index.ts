import { type IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { Term } from '~/common/constants';
import type { IIpcAPI, IProfile, ITermSize } from '~/common/typings';

const ipcAPI: IIpcAPI = {
  openTerm(id: number, profile: IProfile): Promise<boolean> {
    return ipcRenderer.invoke(Term.Open, id, profile);
  },
  closeTerm(id: number) {
    ipcRenderer.send(Term.Close, id);
  },
  writeTerm(id: number, input: string) {
    ipcRenderer.send(Term.Write, id, input);
  },
  resizeTerm(id: number, size: ITermSize) {
    ipcRenderer.send(Term.Resize, id, size);
  },
  onReadTerm(id: number, listener: (data: string) => void) {
    const callback = (e: IpcRendererEvent, tid: number, data: string) => {
      if (tid === id) {
        listener(data);
      }
    };
    ipcRenderer.on(Term.Read, callback);
    return {
      dispose: () => {
        ipcRenderer.off(Term.Read, callback);
      },
    };
  },
};

contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);

declare global {
  interface Window {
    ipcAPI: IIpcAPI;
  }
}
