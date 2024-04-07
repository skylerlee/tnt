import { render } from 'solid-js/web';
import TabArea from './components/tab-area';

const App = () => {
  return (
    <>
      <TabArea />
    </>
  );
};

const root = document.getElementById('root');
render(App, root);
