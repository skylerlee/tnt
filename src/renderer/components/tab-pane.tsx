import { For, mergeProps } from 'solid-js';
import type { Component, JSXElement } from 'solid-js';

interface ITab {
  id: number;
  title: string;
  active?: boolean;
  closable?: boolean;
}

type IProps = { tabs: ITab[]; onTabClick: (tab: ITab) => void; children?: JSXElement };

const TabList = (props: { tabs: ITab[]; onTabClick: (tab: ITab) => void }) => {
  return (
    <div class="tab-list flex flex-row">
      <For each={props.tabs}>
        {(tab) => (
          <div
            classList={{ 'tab bg-dark c-light': true, active: tab.active }}
            onClick={[props.onTabClick, tab]}
            onKeyPress={() => {}}
          >
            {tab.title}
          </div>
        )}
      </For>
    </div>
  );
};

const TabArea = (props: { children: JSXElement }) => {
  const { children } = props;
  return <div class="tab-area flex-1">{children}</div>;
};

const TabPane: Component<IProps> = (props) => {
  const union = mergeProps({ tabs: [] }, props);
  return (
    <div class="tab-pane flex flex-col">
      <TabList tabs={union.tabs} onTabClick={union.onTabClick} />
      <TabArea>{union.children}</TabArea>
    </div>
  );
};

export default TabPane;
