import { Terminal } from '@xterm/xterm';

const term = new Terminal();
term.open(document.getElementById('root'));
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
