import { For, mergeProps } from 'solid-js';
import type { Component, JSXElement } from 'solid-js';

interface ITab {
  title: string;
  closable?: boolean;
}

type IProps = { tabs: ITab[]; children?: JSXElement };

const TabList = (props: { tabs: ITab[] }) => {
  return (
    <div class="tab-list flex flex-row">
      <For each={props.tabs}>{(tab) => <div class="tab bg-dark c-light">{tab.title}</div>}</For>
    </div>
  );
};

const TabArea = (props: { children: JSXElement }) => {
  const { children } = props;
  return <div class="tab-area flex-1">{children}</div>;
};

const TabPane: Component<IProps> = (props) => {
  const merged = mergeProps({ tabs: [] }, props);
  return (
    <div class="tab-pane flex flex-col">
      <TabList tabs={merged.tabs} />
      <TabArea>{merged.children}</TabArea>
    </div>
  );
};

export default TabPane;
