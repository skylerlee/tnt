import { contextBridge } from 'electron';

class IpcAPI {}

const ipcAPI = new IpcAPI();

contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);
