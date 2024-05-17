import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      // generateScopedName: '[local]',
    },
  },
  base: '',
});
