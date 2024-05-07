import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/jest/setup.ts',
    coverage: {
      provider: 'v8',
    },
  },
});
