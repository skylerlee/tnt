import path from 'node:path';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import solid from 'vite-plugin-solid';

const alias = [{ find: '~', replacement: path.resolve(__dirname, 'src') }];
const external = ['node-pty', '@vscode/windows-process-tree'];

export default defineConfig({
  plugins: [
    electron({
      main: {
        entry: 'src/main/index.ts',
        vite: {
          resolve: { alias },
          build: {
            outDir: 'dist/main',
            rollupOptions: {
              external,
            },
          },
        },
      },
      preload: {
        input: 'src/preload/index.ts',
        vite: {
          resolve: { alias },
          build: {
            outDir: 'dist/preload',
          },
        },
      },
    }),
    solid(),
  ],
  resolve: { alias },
  build: {
    outDir: 'dist/renderer',
  },
  css: {
    postcss: {},
  },
});
