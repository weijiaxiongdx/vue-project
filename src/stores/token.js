//定义store

import {defineStore} from 'pinia'
import { ref } from 'vue';

/**
 *  第一个参数：名字，唯一即可，一般和文件名字保持一致
 *  第二个参数：函数，函数内部可以定义状态的所有内容
 * 
 *  组合式写法
 *  官方推荐使用和Hooks一样的命令方式，useXXX
 */
export const useTokenStore = defineStore('token',()=>{

    //存储token
    const token = ref('')

    //修改token函数
    const setToken = (newToken)=>{
        token.value = newToken
    }

    //移除token函数
    const removeToken = ()=>{
        token.value = ''
    }

    {
        persist:true//持久化存储。不配置这个则默认是内存存储
    }

    return {
        token,setToken,removeToken
    }
    
});
