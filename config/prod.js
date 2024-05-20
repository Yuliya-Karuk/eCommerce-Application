import react from '@vitejs/plugin-react';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';
import webfontDownload from 'vite-plugin-webfont-dl';
import viteImagemin from 'vite-plugin-imagemin';
import cleanPlugin from 'vite-plugin-clean';
import checker from 'vite-plugin-checker';
import { paths } from './paths';

export const prodConfig = {
  plugins: [
    react(),
    cleanPlugin(),
    webfontDownload(),
    checker({ typescript: true }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 3,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 3,
      },
      mozjpeg: {
        quality: 83,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
          {
            params: {
              name: 'removeAttrs',
              attrs: '(width|height)',
            },
          },
        ],
      },
    }),
    vitePluginFaviconsInject(paths.src.favIcon, {
      icons: {
        favicons: true,
        appleIcon: true,
        android: true,
        windows: false,
        yandex: false,
        coast: false,
        firefox: false,
        appleStartup: false,
      },
      lang: 'ru',
      theme_color: '#D9D9D9',
      background: '#D9D9D9',
    }),
  ],
  base: '',
  css: {
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
