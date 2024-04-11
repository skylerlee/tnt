import { createStore, produce } from 'solid-js/store';
import type { ITab } from '../types';

const [state, setState] = createStore<{
  activeTabId?: number;
  tabs: ITab[];
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
