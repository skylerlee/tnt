import { For, Show, mergeProps } from 'solid-js';
import type { Component, JSXElement } from 'solid-js';

interface ITab {
  id: number;
  title: string;
  active?: boolean;
  disabled?: boolean;
}

type IProps = { tabs: ITab[]; onTabClick: (tab: ITab) => void; children?: JSXElement };

const TabList = (props: { tabs: ITab[]; onTabClick: (tab: ITab) => void }) => {
  return (
    <div class="tab-list flex flex-row">
      <For each={props.tabs}>
        {(tab) => (
          <div
            classList={{ 'tab p-3 bg-dark c-light': true, 'active bg-neutral': tab.active }}
            onClick={[props.onTabClick, tab]}
            onKeyPress={() => {}}
          >
            <span>{tab.title}</span>
            <Show when={!tab.disabled}>
              <div class="tab-close border-rd">x</div>
            </Show>
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
