// 该文件用于创建Vuex中的store

import Vuex from 'vuex'
Vuex.use(Vuex) // 创建store之前，需要先Vuex.use(Vuex)

// 准备actions，用于响应组件中的动作
const actions = {
    // 定义动作
    // add:function(context,param2){
    //     console.log('定义加涵数')
    // }
    add(context,param2){ // 简写形式。context为上下文对象，可理解为缩小版的store对象，里面有dispatch、commit等方法。param2就是传过来的参数
        console.log('定义加涵数-简写形式')
        context.commit('ADD',param2) // 调用mutations中的ADD函数
    }

}

// 准备mutations，用于操作state中的数据
const mutations = {
    ADD(state,value){
        console.log('123')

        state.sum += value
    }
}

// 准备state，用于存储数据
const state = {
    // 定义共享数据
    sum:0

}


// 模块化写法
// 业务1相关配置
const oneOptions = {
    actions:{

    },

    mutations:{

    },

    state:{

    },
}

// 业务2相关配置
const twoOptions = {
    actions:{

    },

    mutations:{

    },

    state:{

    },
}

// 创建store
// const store = new Vuex.store({
//     actions,
//     mutations,
//     state
// })

// 暴露store
// export default store

// 创建并暴露store
// export default new Vuex.store({
//     // actions:actions,
//     // mutations:mutations,
//     // state:state
//     actions, // 简写形式
//     mutations,
//     state
// })


// 模块化写法
export default new Vuex.store({
    modules:{
        a:oneOptions,
        b:twoOptions
    }
})
