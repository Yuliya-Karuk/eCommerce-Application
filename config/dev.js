import react from '@vitejs/plugin-react';
import webfontDownload from 'vite-plugin-webfont-dl';
import checker from 'vite-plugin-checker';

export const devConfig = {
  server: {
    open: '/',
    port: 5500,
  },
  plugins: [react(), webfontDownload(), checker({ typescript: true })],
  base: '',
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "../src/styles/functions.scss"; @import "../src/styles/mixins.scss"; @import "../src/styles/extends.scss"; @import "../src/styles/placeholders.scss"; @import "../src/styles/constants.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
};
