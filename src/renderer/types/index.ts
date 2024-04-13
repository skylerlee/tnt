import type { JSXElement } from 'solid-js';

export interface ITab {
  id: number;
  title: string;
  disabled?: boolean;
  render: () => JSXElement;
}
