<template>
  <div v-if="!repoUrl">
    loading... <br/>
    <span>{{responseMsg.status}} {{responseMsg.statusText}}</span>
  </div>
  <div v-else>The most star repo is <a :href="repoUrl">{{repoName}}</a><span>{{responseMsg.status}} {{responseMsg.statusText}}</span>
  </div>
  <div v-else></div>
</template>

<script>
  import Axios from 'axios'

  export default {
    name: "App",
    data() {
      return {
        repoName: '',
        repoUrl: '',
        responseMsg: {
          status: '',
          statusText: ''
        }
      }
    },
    mounted() {
      const url = 'https://api.github.com/search/repositories?q=v&sort=stars'
      // 使用vue-resource发送ajax请求
      // this.$http.get(url).then(
      //   response => {
      //     console.log(response);
      //     const item = response.data.items[0];
      //     this.repoName = item.name;
      //     this.repoUrl = item.html_url;
      //   },
      //   response => {
      //     console.log(response);
      //     this.responseMsg.status = response.status;
      //     this.responseMsg.statusText = response.statusText;
      //   }
      // )

      // 使用axios发送ajax请求
      Axios.get(url).then(
        response => {
          console.log(response);
          const item = response.data.items[0];
          this.repoName = item.name;
          this.repoUrl = item.html_url;
        }).catch(error => {
          alert(error);
      })
    }
  }
</script>

<style scoped>

</style>
