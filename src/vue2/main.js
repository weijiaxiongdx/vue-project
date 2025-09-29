
// 这个文件主要是用来引入根组件
import App from "./App.vue";

new vue({
    el:'#root', // 容器从哪来呢，所以还需要一个html文件来定义容器，一般为index.html
    components:{
        App
    }
})