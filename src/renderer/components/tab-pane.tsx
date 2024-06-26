import { type Component, For, Show, createSignal, mergeProps, onMount } from 'solid-js';
import type { ITab } from '../typings';
import DndManager, { type IDndManager } from '../utils/dnd';

type IProps = {
  tabs: ITab[];
  activeTabId?: number;
  onTabClick: (tab: ITab) => void;
  onTabClose: (tab: ITab) => void;
  onTabSwap: (srcId: number, tgtId: number) => void;
};

const TabList = (
  props: Pick<IProps, 'tabs' | 'activeTabId' | 'onTabClick' | 'onTabClose' | 'onTabSwap'>,
) => {
  const [draggingTabId, setDraggingTabId] = createSignal<number | undefined>(undefined);
  let dnd: IDndManager;

  onMount(() => {
    dnd = new DndManager('x', {
      onDragStart: (id) => setDraggingTabId(id),
      onDragEnd: () => setDraggingTabId(undefined),
      onSwap: props.onTabSwap,
    });
  });

  const handleTabClose = (tab: ITab, e: MouseEvent) => {
    e.stopPropagation();
    props.onTabClose(tab);
  };

  return (
    <div class="tab-list flex flex-row h-10 bg-dark-300 c-light b-b-solid b-b-2 b-b-dark-100">
      <For each={props.tabs}>
        {(tab) => (
          <div
            classList={{
              'tab flex items-center px-3 py-2 select-none bg-dark-300 c-light': true,
              'active !bg-dark-100': tab.id === props.activeTabId,
              '!invisible': tab.id === draggingTabId(),
            }}
            onClick={[props.onTabClick, tab]}
            onKeyPress={() => {}}
            draggable="true"
            onMouseDown={dnd.mouseDown}
            onDragStart={[dnd.dragStart, tab.id]}
            onDragOver={[dnd.dragOver, tab.id]}
            onDragEnd={dnd.dragEnd}
          >
            <div class="tab-text flex-1">
              <span>{tab.title}</span>
            </div>
            <Show when={!tab.disabled}>
              <div class="tab-action pl-2">
                <div
                  class="tab-close flex justify-center items-center w-5 h-5 b-solid b-1 b-transparent b-rd hover:b-black/50"
                  onClick={[handleTabClose, tab]}
                  onKeyPress={() => {}}
                >
                  <span class="codicon codicon-close" />
                </div>
              </div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};

const TabArea = (props: Pick<IProps, 'tabs' | 'activeTabId'>) => {
  return (
    <div class="tab-area flex-1 relative">
      <For each={props.tabs}>
        {(tab) => (
          <div
            classList={{
              'tab-content flex absolute top-0 left-0 right-0 bottom-0': true,
              '!invisible': tab.id !== props.activeTabId,
            }}
          >
            {tab.render()}
          </div>
        )}
      </For>
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
        onTabSwap={attrs.onTabSwap}
      />
      <TabArea tabs={attrs.tabs} activeTabId={attrs.activeTabId} />
    </div>
  );
};

export default TabPane;
