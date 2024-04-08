import { createStore, produce } from 'solid-js/store';

interface ITabModel {
  id: number;
  title: string;
  active?: boolean;
  closable?: boolean;
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
