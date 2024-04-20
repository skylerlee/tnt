import type { IIpcAPI } from '@common/typings';
import { contextBridge, ipcRenderer } from 'electron';

const ipcAPI: IIpcAPI = {
  on: (channel, listener) => {
    ipcRenderer.on(channel, listener);
  },
  off: (channel, listener) => {
    ipcRenderer.off(channel, listener);
  },
  send: (channel, ...args) => {
    ipcRenderer.send(channel, ...args);
  },
  invoke: (channel, ...args) => {
    return ipcRenderer.invoke(channel, ...args);
  },
};

contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);
