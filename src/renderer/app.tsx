import { render } from 'solid-js/web';
import TabPane from './components/tab-pane';

const App = () => {
  return (
    <div class="app flex flex-col">
      <TabPane tabs={[]}>
        <div>Hello world</div>
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
