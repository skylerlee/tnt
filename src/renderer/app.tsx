import { render } from 'solid-js/web';
import TabArea from './components/tab-area';

const App = () => {
  return (
    <>
      <TabArea />
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
