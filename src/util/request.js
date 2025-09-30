// 定义请求的实例

import { ElMessage } from 'element-plus';
import axios from 'axios';
import router from '@/router';
//const baseURL = 'http://localhost:5000'; //后端服务地址

//解决跨域问题前端方案：1.将baseURL的值改为api，实际请求时，会将当前ajax请求所在的源拼上去，所以浏览器实际请求地址为前端服务的地址http://localhost:5173/api
//                  2.在vite.config.js文件中配置代理服务器，将到“http://localhost:5173/api”的请求转到后端服务，相当于由前端中的代理服务器请求后端服务(而不是浏览器直接请求后端服务)
//                  3.没有使用这里提供的实例发请求的都需要改造
const baseURL = 'api';
const instance = axios.create({baseURL});

//添加响应拦截器，解决每次发送请求时都得写then、catch的问题
instance.interceptors.response.use(
    //注册成功回调
    result=>{
        // if(result.status == 200){ // 对HTTP响应状态码的判断
        //     return result.data;
        // }
       

         if(result.data.code === "200"){ // 对业务状态码的判断
            return result.data;
        }

        //请求失败
        // alert(result.statusText?result.statusText:'服务器异常2') // HTTP响应文本
        // alert(result.data.msg?result.data.msg:'服务器异常2') // 接口响应数据
        ElMessage.error(result.data.msg?result.data.msg:'服务器异常2');

        //将异步操作的状态改为失败
        return Promise.reject(result.data)
    },

    //注册失败回调
    err=>{
        if(err.response.status===401){
            ElMessage.error("请先登录");
            router.push('/login');
        } else {
            ElMessage.error("服务器异常3");
        }
       
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

//添加请求拦截器，统一token传参
import {useTokenStore} from '@/stores/token.js'
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调
        const tokenStore = useTokenStore();
        if(tokenStore.token){//有token则把token设置到请求头中
            config.headers.Authorization = tokenStore.token
        }

        return config;
    },

    (err)=>{
        //请求错误的回调
        //此处判断状态码，如果未登录，给出对应提示并跳转到登录页面
        if(err.response.status===401){
            alert('请先登录');
            // router.push('/login');
        } else {
            alert('服务异常');
        }
       
        Promise.reject(err);
    }
)


export default instance;