<script lang="ts" setup>
  import {User,Lock} from '@element-plus/icons-vue'
  import {ref} from 'vue'
  import {useRouter} from 'vue-router'
  import { ElMessage } from 'element-plus';
  const router = useRouter()

  // 控制注册与登录表单的显示，默认显示注册
  const isRegister = ref(false)

  // 定义注册表单数据模型
  const registerData = ref({
    username: '', // 用户名
    password: '', // 密码
    rePassword: '' // 再次输入密码
  })


  // 自定义校验函数，必须写在rules前面，否则用不了
  const checkRePassword = (rule, value, callback) => {
    if(value === ''){
        callback(new Error('请再次输入密码'))
    } else if (value !== registerData.value.password){ // 响应式数据需要写.value才能使用其中的数据。写了lang="ts"后，如果不写.value就会提示错误；没有写lang="ts"，如果不写.value不会提示错误
         callback(new Error('请确保两次输入的密码一致'))
    } else {
        callback()
    }
  }


  // 定义表单校验规则
  const rules = {
    username:[
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 2, max: 16, message: '用户名长度范围为2-16个字符', trigger: 'blur'}
    ], 
    password:[
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 5, max: 16, message: '密码长度范围为5-16个字符', trigger: 'blur'}
    ]
    , 
    rePassword:[
        {validator: checkRePassword, trigger: 'blur'} // checkRePassword为自定义校验函数
    ]
  }
  


  // 用户注册
  import {userRegisterService,userLoginService} from '@/api/user.js'
  const register = async ()=>{
    let resutl = await userRegisterService(registerData.value); // 响应式对象需要使用.value
    // if(resutl.code === "200"){ // 对结果的判断统一放到响应拦截器中处理
    //     // router.push("/loginVue")
    //      alert('注册成功');
    // } else {
    //     alert('注册失败');
    // }

    ElMessage.success("注册成功");
    // router.push("/login"); // 跳转到登录页
  }


  // 用户登录
  const login = async ()=>{
    let result = await userLoginService(registerData.value);
    // if(result.code === "200"){ // 对结果的判断统一放到响应拦截器中处理
    //      alert('登录成功');
    // } else {
    //     alert('登录失败');
    // }

    ElMessage.success("登录成功");
    router.push("/"); // 跳转到首页
  }

  // 清空registerData数据模型数据
  const cleaRregisterData = ()=>{
    registerData.value = {
        username: '',
        password: '',
        rePassword: ''
    }
  }

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">  <!-- :rules用于绑定校验规则 -->
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username"> <!-- prop用于指定校验规则中具体的校验项 -->
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;cleaRregisterData()">
                        返回
                    </el-link>
                </el-form-item>
            </el-form>


            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">  <!-- 与注册表单共用数据模型及校验规则 -->
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" name="password" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <dev class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </dev>
                </el-form-item>

                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true;cleaRregisterData()">
                        注册
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>    
    </el-row>
</template>

<style lang="scss" scoped>
.login-page {
    height: 100vh;
    background-color: #fff;
    width: 100vw;

    .bg {
        background: // url('src/assets/images/logo2.jpeg') no-repeat 60% center / 240px auto, // 为什么使用@替换src显示不了图片，需要在vite.config.js中配置别名映射关系？
            url('src/assets/images/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;    
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
    }

    .title {
        margin: 0 auto;
    }

    .button {
        width: 100%;
    }

    .flex {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
    

</style>