import { createStore, produce } from 'solid-js/store';
import type { ITab } from '../types';

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
  setState(
    produce((state) => {
      const index = state.tabs.findIndex((tab) => tab.id === tabId);
      if (index > -1) {
        const [target] = state.tabs.splice(index, 1);
        if (target.id !== state.activeTabId) {
          // removed an inactive tab
          return;
        }
        if (state.prevActiveTabId !== undefined) {
          // adopt to previous tab
          state.activeTabId = state.prevActiveTabId;
        } else if (state.tabs.length > 0) {
          if (index === state.tabs.length - 1) {
            // adopt to preceding tab
            state.activeTabId = state.tabs[index - 1].id;
          } else {
            // adopt to following tab
            state.activeTabId = state.tabs[index].id;
          }
        } else {
          state.activeTabId = undefined;
        }
      }
    }),
  );
};

export { state, setActiveTabId, addTab, removeTab };
