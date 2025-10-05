<!-- 单文件组件
  输入"<v"，然后回车，可通过vetur插件自动生成以下三段。安装了vetur这类插件后，vue文件才会高亮提示
-->
<template>
    <div>单文件组件测试</div>

    <!--  使用store中的数据sum -->
    <!-- <span>{{$store.state.sum}}</span>  -->
</template>

<script>
    export default {
      methods:{
        // add(){
        //   this.$store.dispatch('add',2) // 有了Vuex环境，就可以使用this.$store.dispatch来调用store中actions中定义的函数了
        //   this.$store.dispatch('ADD',2) //              也可以直接调用store中mutations中定义的函数          
        // }
      },

      activated(){
        console.log('路由组件独有钩子函数：路由组件被激活时触发')
      },

      deactivated(){
        console.log('路由组件独有钩子函数：路由组件失活时触发')
      },

      // 组件内路由守卫：必须通过路由规则进入该组件时被调用 
      beforeRouteEnter(to,from,next){
        // 判断权限
        next() // 放行

      },

      // 组件内路由守卫：必须通过路由规则离开该组件时被调用
      beforeRouteLeave(to,from,next){
        // 判断权限
        next() // 放行
      }
    }
</script>

<style>

</style>

