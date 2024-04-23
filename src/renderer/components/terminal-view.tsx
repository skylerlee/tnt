import { FitAddon } from '@xterm/addon-fit';
import { WebglAddon } from '@xterm/addon-webgl';
import { Terminal } from '@xterm/xterm';
import { debounce } from 'radash';
import { type Component, onCleanup, onMount } from 'solid-js';
import { TermView } from '~common/constants/term';
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

    const ok = await window.ipcAPI.openTerm(props.id, { shell: 'zsh', cwd: '/home/skyler' });
    if (ok) {
      terminal.onData((input) => {
        window.ipcAPI.writeTerm(props.id, input);
      });
      terminal.onResize((size) => {
        window.ipcAPI.resizeTerm(props.id, {
          columns: size.cols,
          rows: size.rows,
        });
      });
      window.ipcAPI.onReadTerm(props.id, (output) => {
        terminal.write(output);
      });
    }

    nextTick(() => {
      fitAddon.fit();
    });

    const handleResize = debounce({ delay: 200 }, () => {
      fitAddon.fit();
    });
    window.addEventListener(TermView.Resize, handleResize);

    onCleanup(() => {
      terminal.dispose();
      window.removeEventListener(TermView.Resize, handleResize);
    });
  });

  return <div class="terminal-view" ref={parent} />;
};

export default TerminalView;
