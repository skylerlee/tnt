import { FitAddon } from '@xterm/addon-fit';
import { WebglAddon } from '@xterm/addon-webgl';
import { Terminal } from '@xterm/xterm';
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

    // fit.fit();

    onCleanup(() => {
      terminal.dispose();
    });
  });

  return <div class="terminal-view" ref={parent} />;
};

export default TerminalView;
