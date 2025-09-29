<!-- 
  这也是一个单文件组件，相当于根组件
-->

<template>
    <div>
        <SingleFileComponent></SingleFileComponent> <!-- 第三步：使用组件 -->
    </div>
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