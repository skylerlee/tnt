import { render } from 'solid-js/web';
import TabPane from './components/tab-pane';

const App = () => {
  return (
    <>
      <TabPane tabs={[]}>
        <div>Hello world</div>
      </TabPane>
    </>
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
