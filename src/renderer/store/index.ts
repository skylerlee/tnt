import { createStore, produce } from 'solid-js/store';

const [state, setState] = createStore({
  activeTabId: undefined,
  tabs: [],
});

const setActiveTabId = (tabId) => {
  setState(
    produce((state) => {
      state.activeTabId = tabId;
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
