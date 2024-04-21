import { contextBridge, ipcRenderer } from 'electron';
import { Term } from '~common/constants';
import type { IIpcAPI, IProfile, ITermHandle } from '~common/typings';
import type { IPayload } from '~main/pty/pty-manager';

const ipcAPI: IIpcAPI = {
  openTerm(id: number, profile: IProfile): Promise<ITermHandle> {
    const payload: IPayload<IProfile> = {
      id,
      data: profile,
    };
    return ipcRenderer.invoke(Term.Open, payload).then(() => {
      return {
        title: '',
        onRead: (listener: (data: string) => void) => {
          ipcRenderer.on(Term.Read, (e, data) => {
            listener(data);
          });
        },
      };
    });
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
