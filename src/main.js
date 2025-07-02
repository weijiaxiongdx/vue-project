import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

//安装element-plus后，就可以导入相关内容了
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//汉化，导入这个并使用之后，分页导航条等中的英文就会变成中文
import locale from 'element-plus/dist/locale/zh-cn.js'

//导入路由器，只写目录没写具体js文件，则默认会找目录下的index.js文件
import router from '@/router'

//状态管理
import {createPinia} from 'pinia'
const pinia = createPinia()

//持久化状态管理
import {createPersistedState} from 'pinia-persistedstate-plugin'
const persist = createPersistedState();
pinia.use(persist)

//mitt工具
import emitter from '@/utils/emmitter'

//创建应用实例，应用实例的根组件为App
const app = createApp(App)

//使用element-plus、locale
app.use(ElementPlus,{locale})

//使用路由器
app.use(router)
app.use(pinia)

//控制html元素
app.mount('#app') //挂载整个应用到app容器中
