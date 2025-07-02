<script setup>
    //安装axios依赖 npm install axios
    //从本地导入axios
    import axios from 'axios';
    import {ref} from 'vue';

    //导入抽取出的user.js，目前只导入了其中两个函数。"@/"表示src目录
    import {getAllUserService,searchUserService} from '@/api/user.js';


    //响应式数据：数据模型的值变化了，使用数据的地方也会跟着变化
    //定义响应式数据-列表数据
    const userList = ref([]);

    //加载页面时就获取所有数据并设置到变量userList中
    // axios.get('http://localhost:5000/testVueAxios').then(result=>{
    //             userList.value = result.data
    //         }).catch(err=>{
    //             console.log(err);
    //         })

    const getAllUser = async function(){
        let allUserData = await getAllUserService();
        userList.value = allUserData;
    }
    getAllUser();
   

    //定义响应式数据-列表搜索条件
    const userSearchConditions = ref({
        name: '',
        age: ''
    }) 
    
    //搜索
    //代码抽取到user.js后，这边得加上await、async
    const searchUserByCondition = async function() {
        // axios.get("http://localhost:5000/searchUser",{params: {...userSearchConditions.value}}).then(result=>{
        //         userList.value=result.data
        //     }).catch(err=>{
        //         console.log(err);
        //     })

        let searchUserdata = await searchUserService({...userSearchConditions.value});
        userList.value = searchUserdata;
    }

    //清除搜索条件
    const clearUserSearch = function() {
        userSearchConditions.value.name = '';
        userSearchConditions.value.age = '';
    }
    

    //添加用户
    const addUser = function(){
        axios.post('http://localhost:5000/addUser').then(result=>{
                userList.value=result.data
            }).catch(err=>{
                console.log(err);
            })
    }

    //定义响应式数据-添加用户的参数
    const userParam =ref({
        id: "250",
        name: "王小二",
        age: "22"
    })
    //添加用户2 
    const addUser2 = function(){
        axios.post('http://localhost:5000/addUser2',userParam.value).then(result=>{
                userList.value=result.data
            }).catch(err=>{
                console.log(err);
            })
    }

    import {useRouter} from 'vue-router'
    const router = useRouter()
    const gotoUserElementPlusVue = function(){
        router.push('/userElementPlus')
    }

    //组件通信(组件之间传递数据)
    defineProps(['parentData','getChildData']) //接收父组件传递过来的数据、方法，本组件中可直接使用
    //声明父组件中给子组件绑定的事件，事件一般使用emit变量来接收
    const emit = defineEmits(['hahaEvent'])
</script>

<template>
    <el-card class="box-card">
        <h1>子组件</h1>
        <h3>{{parentData}}</h3>
        <button @click="getChildData('子组件的数据')">点我把数据传递给父组件</button>
        <button @click="emit('hahaEvent',666)">触发自定义事件将子组件的数据传递给父组件</button> <!-- -->

        <br>
        <div>
        用户名：<input type="text"  v-model="userSearchConditions.name"/>
        年龄：<input type="text"  v-model="userSearchConditions.age"/> &nbsp;
        <button v-on:click="searchUserByCondition">搜索</button>
        <button v-on:click="clearUserSearch">重置</button>
        <button v-on:click="gotoUserElementPlusVue">跳转到别的页面</button>
        <br>
        <button v-on:click="addUser">添加用户</button> &nbsp;
        <button v-on:click="addUser2">添加用户2</button> &nbsp;
        <table border="1 solid" colspa="0" cellspacing="0">
            <tr>
                <th>id</th>
                <th>用户名</th>
                <th>年龄</th>
                <th>操作</th>
            </tr>
            <tr v-for="(user,index) in userList">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.age}}</td>
              <td>
                <button>编辑</button>
                <button>删除</button>
              </td>
            </tr>
        </table>
    </div>
    </el-card>
</template>