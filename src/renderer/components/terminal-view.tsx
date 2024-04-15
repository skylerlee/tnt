import { FitAddon } from '@xterm/addon-fit';
import { WebglAddon } from '@xterm/addon-webgl';
import { Terminal } from '@xterm/xterm';
import { debounce } from 'radash';
import { type Component, onCleanup, onMount } from 'solid-js';

type IProps = { active?: boolean };

const TerminalView: Component<IProps> = (props) => {
  let parent: HTMLDivElement;

  onMount(() => {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebglAddon());
    terminal.open(parent);
    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    Promise.resolve().then(() => {
      fitAddon.fit();
    });

    const handleResize = debounce({ delay: 200 }, () => {
      fitAddon.fit();
    });
    window.addEventListener('terminal::resize', handleResize);

    onCleanup(() => {
      terminal.dispose();
      window.removeEventListener('terminal::resize', handleResize);
    });
  });

  return <div class="terminal-view" ref={parent} />;
};

export default TerminalView;
