import type { JSXElement } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

interface ITabModel {
  id: number;
  title: string;
  active?: boolean;
  disabled?: boolean;
  render: () => JSXElement;
}

const [state, setState] = createStore<{
  activeTabId?: number;
  tabs: ITabModel[];
}>({
  activeTabId: undefined,
  tabs: [],
});

const setActiveTabId = (tabId) => {
  setState(
    produce((state) => {
      state.activeTabId = tabId;
      for (const tab of state.tabs) {
        tab.active = tab.id === tabId;
      }
    }),
  );
};

const addTab = (tab) => {
  setState(
    produce((state) => {
      state.tabs.push(tab);
    }),
  );
};

export { state, setActiveTabId, addTab };
