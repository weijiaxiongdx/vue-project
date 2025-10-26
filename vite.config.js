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

 
  css: { // 对css行为进行配置
    preprocessorOptions: { // 对css预处理器的一些全局参数进行配置
      scss: { // 整个配置对象都会传给scss对应的编译器的编译命令中，从而影响编译的行为。能配置什么，看官网
        api: 'modern-compiler' // 解决VS Code控制台中告警而加的 告警信息：“The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.”。如果'modern-compiler'不管用，可换成"modern"
      },

      // less :{ // 整个配置对象都会传给less对应的编译器的编译命令(如npx lessc x.module.css)中，从而影响编译的行为。能配置什么，看官网
      //   math: "always", // 相当于手动执行编译命令时加上了math参数 npx lessc --math="always" x.module.css
      //   globalVars: { // 配置全局变量，这之后，所有需要用到变量"mainColor"的地方直接通过@mainColor使用就行。不像之前可能要创建一个css文件，然后在其中定义变量，然后在所有使用的地方都要引入这个css文件才能使用其中定义的变量
      //     mainColor: "red"
      //   }
      // }
    },

    // modules: { // 对css模块化的默认行为进行覆盖。modules中的配置最终会被postcss modules处理
    //   localsConvention: "camelCase", // import cssObj from "./xxx.module.css"  控制生成的配置对象(cssObj)中的css属性的key的展示形式(驼峰、中划线)
    //   scopeBehaviour: "local", // 配置当前模块化行为是模块化还是全局化，有hash就是开启了模块化，以保证产生不同的hash值，从而避免同样式类名被覆盖(就是会在类名后自动加上一串hash值)。默认值为local
    //   // generateScopedName: "[name]_[local]_[hash:5]" // 配置生成类名的规则。可以怎么配置，见https://github.com/webpack/loader-utils#interpolatename
    //   generateScopedName: (name,filename,css)=>{ // 配置生成类名的规则-函数式，返回值决定了类名的显示。如返回123，则class="123"
    //     console.log("name",name,"filename",filename,"css",css) // 三个参数，name：当前css文件中的类名、filename：当前css文件的绝对路径、css：当前的样式
    //     // return "123"
    //     return `${name}_${Math.random.toString(36).substring(3,8)}`
    //   },
    //   hashPrefix: "hello", // 在hash值前面加上前缀
    //   globalModulePaths: ["./xxx.module.css"] // 配置不参与css模块化的文件，这些文件中样式类名不会加上hash值等
    // },

    // devSourcemap: false // 是否开启css文件的文件索引。开启了之后，压缩后的css文件与原文件之间会建立索引关系。如压缩后的文件中某行报了错，直可以直接定位到原文件中的某行。默认为false
  },
  
  // optimizeDeps: {
  //   exclude: [] // 配置在这里的依赖不会参与依赖预构建
  // }

  // envDir: "", // 配置环境变量文件(.env等文件)所在目录，默认为项目根目录
  // envPrefix: "" // 配置环境变量名的前缀，默认为VITE
})