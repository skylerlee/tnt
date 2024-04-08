import { createStore, produce } from 'solid-js/store';

const [state, setState] = createStore({
  activeTabId: undefined,
  tabs: [],
});

const addTab = (tab) => {
  setState(
    produce((state) => {
      state.tabs.push(tab);
    }),
  );
};

export { state, addTab };
