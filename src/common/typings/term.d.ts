export interface ITermHandle {
  title: string;
  onRead: (listener: (data: string) => void) => void;
}

export interface ITermSize {
  columns: number;
  rows: number;
}
