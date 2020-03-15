<template>
  <div id="app">
    <div class="container">
      <Search/>
      <users-main/>
    </div>
  </div>
</template>

<script>
  // 13407559776
  import Search from './components/search/Search'
  import Main from './components/main/Main'

  export default {
    name: "App",
    components: {
      Search,
      UsersMain: Main
    }
  }
</script>

<style scoped>

</style>
