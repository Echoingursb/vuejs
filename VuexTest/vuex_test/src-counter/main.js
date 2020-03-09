import Vue from 'vue'
import App from './App'
import store from './store'

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store // 所有的组件对象都多了一个属性：$store
})
