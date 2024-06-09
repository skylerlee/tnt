import path from 'node:path';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import solid from 'vite-plugin-solid';

const alias = [{ find: '~', replacement: path.resolve(__dirname, 'src') }];

export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: 'src/main/index.ts',
        vite: {
          resolve: { alias },
          build: {
            rollupOptions: {
              external: ['electron', 'node-pty', '@vscode/windows-process-tree'],
            },
          },
        },
      },
      preload: {
        input: 'src/preload/index.ts',
        vite: {
          resolve: { alias },
        },
      },
    }),
    solid(),
  ],
  resolve: { alias },
  css: {
    postcss: {},
  },
});
