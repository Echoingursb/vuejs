/*
vuex的核心管理对象模块：store
 */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);
// 状态对象
const state = { // 初始化状态
  count: 0
};
// 包含多个更新state函数的对象
const mutations = {
  // 增加的mutation
  INCREMENT(state) {
    state.count++;
  },
  DECREMENT(state) {
    state.count--;
  }

};
// 包含多个对应事件回调函数的对象
const actions = {
  increment({commit}) {
    // 提交到增加的mutation
    commit('INCREMENT')
  },
  decrement({commit}) {
    // 提交到减少的mutation
    commit('DECREMENT')
  },
  // 带条件的action
  incrementIfOdd({commit, state}) {
    if (state.count % 2 === 1) {
      // 提交到增加的mutation
      commit('INCREMENT')
    }
  },
  // 异步的action
  incrementAsync({commit}) {
    // 在action中直接就可以执行异步代码
    setTimeout(() => {
      // 提交到增加的mutation
      commit('INCREMENT')
    }, 1000)
  }
};
// 包含多个getter计算属性函数的对象
const getters = {
  evenOrOdd(state) { // 不需要调用，只需要读取属性值，只需要点名字，不需要加括号
    return state.count % 2 === 0 ? 'even' : 'odd'
  }
};

export default new Vuex.Store({
  // 这些对象在项目中会分别用单独的文件进行管理
  state, // 状态对象
  mutations, // 包含多个更新state函数的对象
  actions, // 包含多个对应事件回调函数的对象
  getters // 包含多个getter计算属性函数的对象
})
