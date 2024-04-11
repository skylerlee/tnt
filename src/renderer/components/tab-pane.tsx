import { For, Show, mergeProps } from 'solid-js';
import type { Component, JSXElement } from 'solid-js';

interface ITab {
  id: number;
  title: string;
  active?: boolean;
  disabled?: boolean;
  render: () => JSXElement;
}

type IProps = { tabs: ITab[]; onTabClick: (tab: ITab) => void; children?: JSXElement };

const TabList = (props: { tabs: ITab[]; onTabClick: (tab: ITab) => void }) => {
  return (
    <div class="tab-list flex flex-row">
      <For each={props.tabs}>
        {(tab) => (
          <div
            classList={{ 'tab p-3 bg-neutral c-light': true, 'active bg-dark': tab.active }}
            onClick={[props.onTabClick, tab]}
            onKeyPress={() => {}}
          >
            <span>{tab.title}</span>
            <Show when={!tab.disabled}>
              <div class="tab-close flex justify-center items-center w-5 h-5 border-rd">
                <span class="codicon codicon-close" />
              </div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};

const TabArea = (props: { tabs: ITab[] }) => {
  return (
    <div class="tab-area flex-1">
      <For each={props.tabs}>{(tab) => <div class="tab-content">{tab.render()}</div>}</For>
    </div>
  );
};

const TabPane: Component<IProps> = (props) => {
  const union = mergeProps({ tabs: [] }, props);
  return (
    <div class="tab-pane flex flex-col">
      <TabList tabs={union.tabs} onTabClick={union.onTabClick} />
      <TabArea tabs={union.tabs} />
    </div>
  );
};

export default TabPane;
