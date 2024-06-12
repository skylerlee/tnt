import 'virtual:uno.css';
import { onCleanup, onMount } from 'solid-js';
import { render } from 'solid-js/web';
import { TermView } from '~/common/constants/term';
import TabPane from './components/tab-pane';
import TerminalView from './components/terminal-view';
import { addTab, removeTab, setActiveTabId, state, swapTab } from './store';
import { uid } from './utils/uid';

const App = () => {
  onMount(() => {
    const handleWindowResize = () => {
      const e = new CustomEvent(TermView.Resize);
      window.dispatchEvent(e);
    };
    window.addEventListener('resize', handleWindowResize);

    onCleanup(() => {
      window.removeEventListener('resize', handleWindowResize);
    });
  });

  const handleAddTab = () => {
    const id = uid();
    addTab({ id, title: `Hello world ${id}`, render: () => <TerminalView id={id} /> });
  };

  const handleAddTabByKeyPress = () => {};

  return (
    <div class="app flex flex-col">
      <TabPane
        tabs={state.tabs}
        activeTabId={state.activeTabId}
        onTabClick={(tab) => setActiveTabId(tab.id)}
        onTabClose={(tab) => removeTab(tab.id)}
        onTabSwap={swapTab}
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
