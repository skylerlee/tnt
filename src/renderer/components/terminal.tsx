import { FitAddon } from '@xterm/addon-fit';
import { Terminal as XTerminal } from '@xterm/xterm';
import { type Component, onCleanup, onMount } from 'solid-js';

type IProps = { active?: boolean };

const Terminal: Component<IProps> = (props) => {
  let parent: HTMLDivElement;

  onMount(() => {
    const term = new XTerminal();
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(parent);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    onCleanup(() => {
      term.dispose();
    });
  });

  return <div class="terminal" ref={parent} />;
};

export default Terminal;
