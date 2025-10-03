// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 创建一个路由器
const router = new VueRouter({
    routers:[
        {
            path:'home',
            component:Home,
            children:[
                {
                    name:news, // 给路由起个名字，可以简化路由的跳转
                    path:'news', // 子级路由前面一定不能加“/”
                    // path:'news/:id/:param2', // params参数，此处相当于占了两个位置，路由的地方写/home/news/23/张三，后两部分就会被当成参数了
                    component:News,
                    // props:{a:1,b:'hello'} // props参数第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给News组件。传的是死数据，很少用
                    // props:true //  props参数第二种写法，值为布尔值，若为真，就会把该路由组件收到的所有params参数以props的形式传给News组件。不能传query参数
                    props($route){ // props参数第三种写法，值为函数，该函数返回的对象中每一组key-value都会通过props的形式传给News组件。通过$route对象想拿什么参数就拿什么参数
                        return {
                            id:$route.query.id,
                            title:$route.query.title
                        }
                    }
                }
            ]
        },
        {
            path:'about',
            component:About
        }
    ]
})


// 对外暴露路由器
export default router
