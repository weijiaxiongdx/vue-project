//vue-router安装后，可导入其相关模块
import {createRouter,createWebHistory} from 'vue-router'

//导入组件
import UserVue from '@/User.vue'
import UserElementPlus from '@/UserElementPlus.vue'

//定义路由关系，即定义访问路径和组件的对应关系，不同的访问路径展示不同的组件内容
//通过children配置子路由
const routes = [
    { path: '/userVue',component:UserVue,name:'routeName' },//取个名字，更容易区分
    { path: '/userElementPlus',component:UserElementPlus },
    { 
        path: '/', //请求地址中不写path(只有IP和端口)，默认为/，则匹配到这个路由
        component:UserElementPlus,
        children:[
            // {path:'',component: XXXXXX},//子级路由中，path的值前不用写/。跳子级路由时，需要写到子路由的完整路径(从上层到下层，一层层的写)
            {
                path:'a/:param1/:param2/:param3?',
            // component: YYYYYY, //传递参数：params方式，此处占了三个位置，实际路由的地方通过a/value1/value2/value3形式来传递三个参数。加问号表示可传可不传
            // props:true //加了这个配置之后，使用的地方可以直接通过defineProps(['param1','param2','param3'])接收所有的params参数
            // props(route){ //函数写法，自己决定将什么作为propos传递给路由组件
            //     return route.query //这个里面包括了所有的query参数，使用的地方也可以通过defineProps接收参数
            // }     
                // props:{//对象写法，相当于直接在组件上传递参数<YYYYYY a=100 b=299>
                //     a:100,
                //     b:299
                // }
            }    
        ]
    } 
]

//创建路由器
//路由模式有两种
//history模式：优点：URL更加美观，不带有#。缺点：项目上线，需要服务端配合处理路径问题，否则刷新会有404错误
//hash模式：优点：兼容性更好，因为不需要在服务端处理路径。缺点：URL带有#不太美观、在SEO优化方面相对较差
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

//导出路由
export default router