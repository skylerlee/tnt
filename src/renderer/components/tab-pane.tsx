import { type Component, For, Show, mergeProps } from 'solid-js';
import type { ITab } from '../types';

type IProps = {
  tabs: ITab[];
  activeTabId: number;
  onTabClick: (tab: ITab) => void;
  onTabClose: (tab: ITab) => void;
};

const TabList = (props: {
  tabs: ITab[];
  activeTabId: number;
  onTabClick: (tab: ITab) => void;
  onTabClose: (tab: ITab) => void;
}) => {
  return (
    <div class="tab-list flex flex-row">
      <For each={props.tabs}>
        {(tab) => (
          <div
            classList={{
              'tab p-3 bg-neutral c-light': true,
              'active bg-dark': tab.id === props.activeTabId,
            }}
            onClick={[props.onTabClick, tab]}
            onKeyPress={() => {}}
          >
            <span>{tab.title}</span>
            <Show when={!tab.disabled}>
              <div
                class="tab-close flex justify-center items-center w-5 h-5 border-rd"
                onClick={[props.onTabClose, tab]}
                onKeyPress={() => {}}
              >
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
  const attrs = mergeProps({ tabs: [] }, props);
  return (
    <div class="tab-pane flex flex-col">
      <TabList
        tabs={attrs.tabs}
        activeTabId={attrs.activeTabId}
        onTabClick={attrs.onTabClick}
        onTabClose={attrs.onTabClose}
      />
      <TabArea tabs={attrs.tabs} />
    </div>
  );
};

export default TabPane;
