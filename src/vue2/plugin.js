// 自定义插件，用于增强Vue功能。插件中可以做很多事
const obj = {
    install(Vue,param1,param2){ // 必须要有install。第一个参数Vue是固定的，后面的参数由插件使用者传入
        console.log('自定义插件')

        // 定义全局过滤器
        // Vue.filter()

        // // 定义全局指令
        // Vue.directive()

        // // 定义混入
        // Vue.mixin()

        // // 在Vue原型上添加方法等
        // Vue.prototype.XXX
    }
}

export default obj