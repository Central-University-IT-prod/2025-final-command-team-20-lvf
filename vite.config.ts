import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      sourceMap: true,
    },
    rollupOptions: {
      plugins: [
        {
          name: 'disable-treeshake',
          transform(_, id) {
              if (id.includes("index.module.scss")) {
                  return { moduleSideEffects: 'no-treeshake' };
              }
          },
        },
      ],
      output: {
        manualChunks(id) {
          if (id.includes('react')) return 'react';
          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('sentry')) return 'sentry';
          if (id.includes('lottie')) return 'lottie';
          if (id.includes('components')) return 'components';
          if (id.includes('telegram-ui')) return 'telegram-ui';
          if (id.includes('vkontakte')) return 'icons';
          
          const animations = ['duckFreeStars', 'giftBlue', 'premium', 'stars'];
          
          for (const animation of animations) {
            if (id.includes(animation)) return 'lottie_' + animation;
          }
        }
      },
    },
  },
})
