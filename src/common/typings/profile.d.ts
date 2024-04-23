import type { ITermSize } from './term';

export interface IProfile {
  shell: string;
  cwd: string;
  initialSize?: ITermSize;
}
