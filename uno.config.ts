import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{jsx,tsx}'],
  },
  presets: [presetUno()],
});
