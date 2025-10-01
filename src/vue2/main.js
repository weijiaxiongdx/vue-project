// 这个文件主要是用来引入根组件
import App from "./App.vue";


// 引入插件
import plugins from './plugin'

// 引入Vuex
import Vuex from 'vuex'

// 引入store
// import store from "./store"; // 默认找的就是store目录下的index.js文件

// 使用自定义插件。其它地方就都能使用插件中提供的功能
Vue.use(plugins,1,2) // 1、2表示传给插件的参数

// 使用第三方插件
// Vue.use(Vuex) // 不能写在这个文件里(的任意位置)。因为js文件执行时，会先按顺序执行所有的import对应的文件中的语句，但Vuex要求new Store()之前必须Vue.use(Vuex)，否则报错。所以Vue.use(Vuex)需要写在store/index.js文件中

new vue({
    el:'#root', // 容器从哪来呢，所以还需要一个html文件来定义容器，一般为index.html
    // store:store,
    store, // 简写形式。只有Vue.use(Vuex)使用插件后，这里配置的store才会生效(Vue实例对象及组件实例对象上就会出现$store)
    components:{
        App
    },
    beforeCreate(){
        Vue.prototype.$bus = this // 安装全局事件总线$bus(名字可随便取，但还是要符合Vue规范，所以取了$bus)
                                 // 可利用$bus来实现任意组件之间的传参：数据接收方利用$bus绑定事件(A组件mounted中绑定事件this.$bus.$on、beforeDestory中解绑事件)、数据提供方利用$bus触发事件(B组件中this.$bus.$emit)
                                 // 另外，还可以通过pubsub-js库来实现任意组件之间的参数传递(订阅消息-接收参数，发布消息-传递参数)
    }
})