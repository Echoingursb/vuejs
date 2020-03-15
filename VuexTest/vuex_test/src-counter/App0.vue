<!--views 以声明方式将state映射到视图-->
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
  export default {
    name: "App",
    // state 驱动应用的数据源
    data() {
      return {
        count: 0
      }
    },
    computed: {
      evenOrOdd() {
        return this.count % 2 === 0 ? 'even' : 'odd'
      }
    },
    // actions 响应在view上的用户输入导致的状态变化
    methods: {
      increment() {
        let {count} = this;
        this.count = ++count
      },
      decrement() {
        let {count} = this;
        this.count = --count
      },
      incrementIfOdd() {
        let {count} = this;
        if (count % 2 === 1) {
          this.count = count + 1
        }
      },
      incrementAsync() {
        setTimeout(() => {
          let {count} = this;
          this.count = ++count
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
