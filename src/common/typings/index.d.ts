import { IIpcAPI } from './ipc';
export { IProfile } from './profile';
export { IIpcAPI };

declare global {
  interface Window {
    ipcAPI: IIpcAPI;
  }
}
