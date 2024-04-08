import { render } from 'solid-js/web';
import TabPane from './components/tab-pane';
import { addTab, setActiveTabId, state } from './store';

const App = () => {
  const handleAddTab = () => {
    addTab({ title: 'Hello world' });
  };

  const handleAddTabByKeyPress = () => {};

  return (
    <div class="app flex flex-col">
      <TabPane tabs={state.tabs} onTabClick={(tab) => setActiveTabId(tab.id)}>
        <div onClick={handleAddTab} onKeyPress={handleAddTabByKeyPress}>
          Add +
        </div>
      </TabPane>
    </div>
  );
};

window.mountApp = () => {
  const root = document.getElementById('root');
  if (root) {
    render(App, root);
  } else {
    console.error('root element not found');
  }
};

declare global {
  interface Window {
    mountApp: () => void;
  }
}
