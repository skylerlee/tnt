import { FitAddon } from '@xterm/addon-fit';
import { WebglAddon } from '@xterm/addon-webgl';
import { Terminal } from '@xterm/xterm';
import { throttle } from 'radash';
import { type Component, onCleanup, onMount } from 'solid-js';
import { TermView } from '~/common/constants/term';
import { Disposables } from '~/common/utils/disposables';

type IProps = { id: number };

const TerminalView: Component<IProps> = (props) => {
  const { id } = props;
  let parent!: HTMLDivElement;

  onMount(() => {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebglAddon());
    terminal.open(parent);

    const disposables = new Disposables();
    disposables.register(terminal);

    // start terminal process
    window.ipcAPI
      .openTerm(id, {
        shell: 'zsh',
        cwd: '/home/skyler',
        initialSize: fitAddon.proposeDimensions(),
      })
      .then((ok) => {
        if (!ok) {
          console.error('openTerm failed');
          return;
        }
        disposables.register(
          terminal.onData((input) => {
            window.ipcAPI.writeTerm(id, input);
          }),
        );
        disposables.register(
          terminal.onResize((size) => {
            window.ipcAPI.resizeTerm(id, size);
          }),
        );
        disposables.register(
          window.ipcAPI.onReadTerm(id, (output) => {
            terminal.write(output);
          }),
        );
        disposables.register({
          dispose: () => {
            // stop terminal process
            window.ipcAPI.closeTerm(id);
          },
        });
        // trigger resize
        fitAddon.fit();
      });

    const handleResize = throttle({ interval: 200 }, () => {
      fitAddon.fit();
    });
    window.addEventListener(TermView.Resize, handleResize);

    onCleanup(() => {
      disposables.dispose();
      window.removeEventListener(TermView.Resize, handleResize);
    });
  });

  return <div class="terminal-view" ref={parent} />;
};

export default TerminalView;
