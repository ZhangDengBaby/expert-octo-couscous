import { fileURLToPath, URL  } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, './')
  return {
    plugins: [vue(), Components({
      resolvers: [AntDesignVueResolver()],
    })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/spark': {
          target: config.VITE_BASIC_URL,
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/spark/, '')
          }
        }
      }
   }
  }
})
