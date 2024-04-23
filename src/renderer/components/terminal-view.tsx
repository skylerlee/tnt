import { FitAddon } from '@xterm/addon-fit';
import { WebglAddon } from '@xterm/addon-webgl';
import { Terminal } from '@xterm/xterm';
import { throttle } from 'radash';
import { type Component, onCleanup, onMount } from 'solid-js';
import { TermView } from '~common/constants/term';
import { Disposable } from '~common/utils/disposable';
import { nextTick } from '../utils/async';

type IProps = { id: number };

const TerminalView: Component<IProps> = (props) => {
  let parent: HTMLDivElement;

  onMount(async () => {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebglAddon());
    terminal.open(parent);

    // start terminal process
    const ok = await window.ipcAPI.openTerm(props.id, {
      shell: 'zsh',
      cwd: '/home/skyler',
      initialSize: fitAddon.proposeDimensions(),
    });
    const disposable = new Disposable();
    if (ok) {
      disposable.register(
        terminal.onData((input) => {
          window.ipcAPI.writeTerm(props.id, input);
        }),
      );
      disposable.register(
        terminal.onResize((size) => {
          window.ipcAPI.resizeTerm(props.id, size);
        }),
      );
      disposable.register(
        window.ipcAPI.onReadTerm(props.id, (output) => {
          terminal.write(output);
        }),
      );
    }

    nextTick(() => {
      fitAddon.fit();
    });

    const handleResize = throttle({ interval: 200 }, () => {
      fitAddon.fit();
    });
    window.addEventListener(TermView.Resize, handleResize);

    onCleanup(() => {
      disposable.dispose();
      terminal.dispose();
      window.removeEventListener(TermView.Resize, handleResize);
    });
  });

  return <div class="terminal-view" ref={parent} />;
};

export default TerminalView;
