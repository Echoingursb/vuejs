<template>
  <div>
    <p>click {{$store.state.count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
  export default {
    name: "App",
    computed: {
      evenOrOdd() {
        return this.$store.getters.evenOrOdd // this 组件对象
      }
    },
    methods: {
      increment() {
        // 通知vuex
        this.$store.dispatch('increment') // 触发store中对应的action调用
      },
      decrement() {
        this.$store.dispatch('decrement') // 触发store中对应的action调用
      },
      incrementIfOdd() {
        this.$store.dispatch('incrementIfOdd') // 触发store中对应的action调用

      },
      incrementAsync() {
        this.$store.dispatch('incrementAsync') // 触发store中对应的action调用
      }
    }
  }
</script>

<style scoped>

</style>
