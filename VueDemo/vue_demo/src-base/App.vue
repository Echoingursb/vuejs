<!--根组件-->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--3. 使用组件标签-->
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld' // 1. 引入组件

export default {
  name: 'App',
  components: { // 2. 映射组件标签
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
