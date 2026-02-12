import { defineConfig } from 'vite';
import { sync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
    base: '/goit-js-hw-10/',
    root: 'src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: sync('./src/*.html'),
        },
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/**.html'])
  ],
});