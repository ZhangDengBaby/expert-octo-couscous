import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, './')
  console.log('config', config);
  
  return {
    plugins: [vue(), Components({
      resolvers: [AntDesignVueResolver({
        importStyle: 'less'
      })],
    })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#26D4A2',
            'border-color-base': '#26D4A2',
            'box-shadow-base': '0 0 8px #26D4A2'
          },
          javascriptEnabled: true,
        },
      }
    },
    server: {
      proxy: {
        // '/sparkdev/': {
        //   target: config.VITE_BASIC_URL,
        //   changeOrigin: true,
          // rewrite: (path) => {
          //   return path.replace(/^\/spark/, '')
          // }
        // },
        // '/cos': {
          // target: config.VITE_BASIC_URL,
          // changeOrigin: true,
          // rewrite: (path) => {
          //   return path.replace(/^\/cos/, '')
          // }
        // }
      }
    }
  }
})
