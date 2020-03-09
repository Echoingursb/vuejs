<template>
  <div id="app">
    <mt-button type="primary" @click.native="handleClick">Test</mt-button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'


  export default {
    name: "App",
    components: {

    },
    methods: {
      handleClick: function () {
        Toast('提示信息')
      }
    }

  }
</script>

<style scoped>

</style>
