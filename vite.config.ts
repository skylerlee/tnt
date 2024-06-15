import path from 'node:path';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import solid from 'vite-plugin-solid';
import { viteStaticCopy as staticCopy } from 'vite-plugin-static-copy';

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
    unocss(),
    solid(),
    staticCopy({
      targets: [
        {
          src: 'package.json.in',
          dest: '..',
          rename: 'package.json',
        },
      ],
    }),
  ],
  resolve: { alias },
  build: {
    outDir: 'dist/renderer',
  },
  css: {
    postcss: {},
  },
});
