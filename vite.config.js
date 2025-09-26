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

  //这里配置代理的真正含义：浏览器中看到的请求地址对应的请求将会转发到这里target指定的服务器。前后端分开部署的时候，前端请求后端接口时，需要经过这里的代理服务器将请求转发到后端服务器
  //这样做了之后，也就解决了本地环境跨域问题
  server:{ // 代理服务器
    proxy:{
      // '/api':{//匹配路径中包含了/api的请求       登录用这个
        '/user/api':{//匹配路径中包含了/api的请求   其它暂时用这个
        target:'http://localhost:5000',//后端服务所在源。将源修改为target配置的值
        changeOrigin:true,//true表示可以修改源
        // rewrite:(path)=>path.replace(/^\/api/,'')//将路径中的api替换为''     登录用这个
        rewrite:(path)=>path.replace(/^\/user\/api/,'')//将路径中的api替换为''  其它暂时用这个
      }
    }
  },

    css: { // 解决VS Code控制台中告警而加的 告警信息：“The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.”
    preprocessorOptions: {
      // 如果'modern-compiler'不管用，可换成"modern"
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  }  
})
