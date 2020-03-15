import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router // 注册路由器
})
