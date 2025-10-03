<!-- 
  这也是一个单文件组件，相当于根组件
-->

<template>
    <div>
        <SingleFileComponent></SingleFileComponent> <!-- 第三步：使用组件 -->
    </div>

    <router-link to="/home">主页</router-link> <!-- 最终会被转成a标签，以实现路由的切换 -->
    <router-link to="`/home?id=${param}`">主页</router-link> <!-- query参数，通过模板字符串传参。to的字符串写法 -->
    <router-link to="`/home/${param}`">主页</router-link> <!-- params参数，通过模板字符串传参。to的字符串写法 -->

    <!-- 传参，to的对象写法 -->
    <router-link :to="{
        // path:'/home/news', // 需要从顶层路由开始，一层一层的找到最下级路由
        name:'news', // 直接通过子级路由名字找到子级路由
        // query:{ // 查询参数
        //     id:param1,
        //     title:param2
        // }

         params:{ // params参数
            id:param1,
            title:param2
        }
    }">
    主页
    </router-link>
    <router-link to="/about">关于</router-link>

    <!-- 切换到具体的组件时，组件的呈现位置 -->
    <router-view></router-view> 
</template>

<script>
    // 第一步：引入组件
    import SingleFileComponent from './SingleFileComponent.vue'; 
    // import SingleFileComponent from './SingleFileComponent'; // 可以省略文件后缀
    export default {
        name: 'App',
        components:{ // 第二步：注册组件
            SingleFileComponent:SingleFileComponent
        }
    }
</script>

<style>

</style>