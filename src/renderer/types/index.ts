export interface ITab {
  id: number;
  title: string;
  active?: boolean;
  disabled?: boolean;
  render: () => JSXElement;
}
