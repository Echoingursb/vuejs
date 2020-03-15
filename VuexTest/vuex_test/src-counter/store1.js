const moduleA = {
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    incrementIfOddOnRootSum({state, commit, rootState}) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    sumWithRootCount({state, getters, rootState}) {
      return state.count + rootState.count;
    }
  }
};

const moduleB = {
  state: {},
  mutations: {},
  actions: {},
  getters: {}
};

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
});
