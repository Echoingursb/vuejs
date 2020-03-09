import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import Axios from 'axios'

Vue.use(VueResource) // 内部会给vm对象和组件对象添加一个属性：$http 有两个方法 get post


new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
