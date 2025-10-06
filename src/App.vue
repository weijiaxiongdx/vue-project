<script setup name="App">//name表示当前组件的名称，一般和文件名一致。如果要不一致，则需要安装插件(npm i vite-plugin-vue-setup-extend -D)并在vite.config.js导入(import VueSetupExtend from 'vite-plugin-vue-setup-extend')且导出该插件，浏览器Vue中才能显示name指定的与文件名不一致的组件名称
import TheWelcome from './components/TheWelcome.vue'

// import UserVue from './User.vue'
// import ButtonVue from './Button.vue'
// import UserElementPlus from './UserElementPlus.vue'

// script标签里面可以写JS，也可以写TS
</script>

<template>
  <!-- Vue3模板中可以不写根标签(div) -->
  <!-- <UserVue/> -->
  <!-- <br> -->
  <!-- <ButtonVue/> -->
  <!-- <br> -->
  <!-- <UserElementPlus/> -->

  <!--  通过路由器来控制显示哪个组件内容。App.vue中的路由是一级路由  -->
  <!-- <router-view></router-view> -->
  <!-- 也可以这么写 -->
  <RouterView></RouterView>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
