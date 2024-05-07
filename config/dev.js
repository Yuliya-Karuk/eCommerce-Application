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
      generateScopedName: '[local]',
    },
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
};
