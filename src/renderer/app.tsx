import { onCleanup, onMount } from 'solid-js';
import { render } from 'solid-js/web';
import TabPane from './components/tab-pane';
import TerminalView from './components/terminal-view';
import { addTab, removeTab, setActiveTabId, state } from './store';

const App = () => {
  onMount(() => {
    const handleResize = () => {
      const e = new CustomEvent('terminal:resize');
      window.dispatchEvent(e);
    };
    window.addEventListener('resize', handleResize);

    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  const handleAddTab = () => {
    addTab({ id: Date.now(), title: 'Hello world', render: () => <TerminalView /> });
  };

  const handleAddTabByKeyPress = () => {};

  return (
    <div class="app flex flex-col">
      <TabPane
        tabs={state.tabs}
        activeTabId={state.activeTabId}
        onTabClick={(tab) => setActiveTabId(tab.id)}
        onTabClose={(tab) => removeTab(tab.id)}
      />
      <div onClick={handleAddTab} onKeyPress={handleAddTabByKeyPress}>
        Add +
      </div>
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
