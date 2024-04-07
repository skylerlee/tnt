import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['**/*.{jsx,tsx}'],
  },
  presets: [presetUno()],
});
