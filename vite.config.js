import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  //配置代理，以解决跨域问题
  server:{
    proxy:{
      '/api':{//匹配路径中包含了/api的请求
        target:'http://localhost:5000',//后端服务所在源
        changeOrigin:true,//true表示可以修改源
        rewrite:(path)=>path.replace(/^\/api/,'')//将路径中的api替换为''
      }
    }
  }
})
