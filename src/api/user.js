//将用户相关的接口调用抽取到本文件中

// import axios from 'axios';

//定义一个变量，记录请求地址的公共前缀，以便复用，一般名称为baseURL
// const baseURL = 'http://localhost:5000';

//将baseURL创建为一个请求实例，最终instance与axios有同样的功能，只是instance中包含地址公共前缀部分，使用instance发送请求时不用再写这部分地址了
// const instance = axios.create({baseURL});

//导入这个后，可以将上面三行注释掉了
import request from '@/util/request.js'

//获取所有用户数据的函数，一般以Service结尾，通过export暴露给外部使用
export /*async*/ function getAllUserService(){
    //本身是异步请求，不搞成同步的话，调用方不能够及时拿到数据并渲染(还没拿到数据就去渲染了，肯定是不会展示数据)
    //加上await关键字同步等待结果，但await必须用在异步函数中，所以同时又得加上async，最后还得在请求上加上return将等待的结果返回
    //但是，因为这里加了async表示异步，调用方又得加await并封装在一个async函数中，真是麻烦的一批
    //return await axios.get('http://localhost:5000/testVueAxios').then(result=>{
    // return await instance.get('/testVueAxios').then(result=>{
    //     return result.data
    // }).catch(err=>{
    //     console.log(err);
    // })

    //then、catch在响应拦截器中自动添加了，发送请求的地方不用再写了
    //因为拦截器是异步的，使用这种方式后，就不再需要awai、async了，调用方有await控制就行了
    return /*await*/ request.get('/testVueAxios');
}

//搜索用户数据的函数
export /*async*/ function searchUserService(searchParam){
    //return await axios.get("http://localhost:5000/searchUser",{params: searchParam}).then(result=>{
    // return await instance.get("/searchUser",{params: searchParam}).then(result=>{    
    //     return result.data
    // }).catch(err=>{
    //     console.log(err);
    // })

    return /*await*/ request.get("/searchUser",{params: searchParam})
}

export function addUser2Service(userParam){
    return request.post("/addUser2", userParam)
}

export function updateUserService(userParam){
    return request.post("/updateUser", userParam)
}

export function deleteUserService(id){
    return request.delete("/deleteUser?id="+id)
}

// 用户注册函数
export function userRegisterService (registerData){
    return request.post('/user/register',registerData)
}

// 用户登录函数
export function userLoginService (loginData){
    return request.post('/user/login',loginData)
}