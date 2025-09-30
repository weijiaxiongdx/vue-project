
// 这个文件主要是用来引入根组件
import App from "./App.vue";


// 引入插件
import plugins from './plugin'

// 使用插件。其它地方就都能使用插件中提供的功能
Vue.use(plugins,1,2) // 1、2表示传给插件的参数

new vue({
    el:'#root', // 容器从哪来呢，所以还需要一个html文件来定义容器，一般为index.html
    components:{
        App
    },
    beforeCreate(){
        Vue.prototype.$bus = this // 安装全局事件总线$bus(名字可随便取，但还是要符合Vue规范，所以取了$bus)
                                 // 可利用$bus来实现任意组件之间的传参：数据接收方利用$bus绑定事件(A组件mounted中绑定事件this.$bus.$on、beforeDestory中解绑事件)、数据提供方利用$bus触发事件(B组件中this.$bus.$emit)
                                 // 另外，还可以通过pubsub-js库来实现任意组件之间的参数传递(订阅消息-接收参数，发布消息-传递参数)
    }
})