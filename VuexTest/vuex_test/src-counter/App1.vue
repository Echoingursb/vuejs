<template>
  <div>
    <p>click {{count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: "App",
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState(['count']), // mapState() 返回值 {count() {return this.$store.state['count']}}
      ...mapGetters(['evenOrOdd']) // mapGetters() 返回值 {evenOrOdd() {return this.$store.getters['evenOrOdd']}}
    },
    methods: {
      ...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
    }
  }
</script>

<style scoped>

</style>
