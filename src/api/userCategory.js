import request from '@/util/request.js'
import {useTokenStore} from '@/stores/token.js'


// 用户分类列表查询
export const categoryService = ()=>{
    // const tokenStore = useTokenStore();
    // return request.get('/user/category',{headers: {'Authorization':tokenStore.token}}) // pinia中定义的响应式数据都不需要加.value
    return request.get('/user/category')  // 请求头中设置token放到了请求拦截器中
}


// 添加用户分类
export const categoryAddService = (categoryData)=>{
    return request.post('/user/addCategory',categoryData)
}

// 编辑用户分类
export const categoryUpdateService = (categoryData)=>{
    return request.post('/user/updateCategoryById',categoryData)
}

// 删除用户分类
export const categoryDeleteService = (id)=>{
    return request.post('/user/deleteCategoryById?id='+id)
}