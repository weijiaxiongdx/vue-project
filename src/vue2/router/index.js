// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 创建一个路由器
const router = new VueRouter({
    mode:'history', // 路由模式不写则默认为hash模式
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
                    },
                    meta:{ // 配置路由元信息，供其它地方使用
                        isAuth:true // 自定义属性，切换到该路由时需要权限校验
                    },

                    beforeEnter:(to,from,next)=>{ // 独享路由守卫：某个路由独享，只有前置没有后置
                        // 权限判断
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

// 全局前置路由守卫：在这里可以做路由切换时的权限判断，如满足一定的条件才进行路由切换。初始化时被调用、每一次路由切换之前被调用
router.beforeEach((to,from,next)=>{ // 分别为目标路由、源路由
    // if(to.path === '/x/y' || to.path === '/x/z'){ // 判断路由路径
    if(to.name === 'Home' || to.name === 'Home2'){ // 判断路由组件名称 
        if(localStorage.getItem('XXX') === 'YYY'){
            next() // 放行
        } else {
            alert('无权限查看')
        }
    } else {
        next() // 放行
    }
})


// 全局后置路由守卫：初始化时被调用、每一次路由切换之后被调用
router.afterEach((to,from)=>{
    // 这里可以做的事：每次切换路由后，改变页签的title，页签的title信息可以事先放到路由元信息meta中
})


// 对外暴露路由器
export default router
