import { Terminal as XTerminal } from '@xterm/xterm';
import { onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';

type IProps = { active?: boolean };

const Terminal: Component<IProps> = (props) => {
  let parent: HTMLDivElement;

  onMount(() => {
    const term = new XTerminal();
    term.open(parent);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

    onCleanup(() => {
      term.dispose();
    });
  });

  return <div class="terminal" ref={parent} />;
};

export default Terminal;
