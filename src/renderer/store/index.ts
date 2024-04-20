import { createStore, produce } from 'solid-js/store';
import type { ITab } from '../typings';

const tabSet = new Set<number>();

const [state, setState] = createStore<{
  prevActiveTabId?: number;
  activeTabId?: number;
  tabs: ITab[];
}>({
  prevActiveTabId: undefined,
  activeTabId: undefined,
  tabs: [],
});

const setActiveTabId = (tabId: number) => {
  setState(
    produce((state) => {
      state.prevActiveTabId = state.activeTabId;
      state.activeTabId = tabId;
    }),
  );
};

const addTab = (tab: ITab) => {
  tabSet.add(tab.id);
  setState(
    produce((state) => {
      state.tabs.push(tab);
      if (state.tabs.length === 1) {
        state.activeTabId = state.tabs[0].id;
      }
    }),
  );
};

const removeTab = (tabId: number) => {
  tabSet.delete(tabId);
  setState(
    produce((state) => {
      const index = state.tabs.findIndex((tab) => tab.id === tabId);
      if (index > -1) {
        const [target] = state.tabs.splice(index, 1);
        if (target.id !== state.activeTabId) {
          // removed an inactive tab
          return;
        }
        if (state.prevActiveTabId !== undefined && tabSet.has(state.prevActiveTabId)) {
          // adopt to previous tab
          state.activeTabId = state.prevActiveTabId;
        } else if (state.tabs.length === 0) {
          // empty list
          state.activeTabId = undefined;
        } else {
          // non-empty list
          let nextIndex = index;
          if (index > state.tabs.length - 1) {
            // adopt to preceding tab
            nextIndex = index - 1;
          }
          state.activeTabId = state.tabs[nextIndex].id;
        }
      }
    }),
  );
};

export { state, setActiveTabId, addTab, removeTab };
