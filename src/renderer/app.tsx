import { render } from 'solid-js/web';
import TabPane from './components/tab-pane';

const App = () => {
  return (
    <>
      <TabPane />
    </>
  );
};

window.mountApp = () => {
  const root = document.getElementById('root');
  if (!root) {
    console.error('root element not found');
  }
  render(App, root);
};

declare global {
  interface Window {
    mountApp: () => void;
  }
}
