<template>
  <div>
    <p>id: {{$route.params.id}}</p>
    <ul>
      <li>id: {{messageDetail.id}}</li>
      <li>title: {{messageDetail.title}}</li>
      <li>content: {{messageDetail.content}}</li>
    </ul>
  </div>
</template>

<script>
  const messageDetails = [
    {id: 1, title: 'message001', content: 'content001'},
    {id: 2, title: 'message002', content: 'content002'},
    {id: 4, title: 'message004', content: 'content004'},
  ]
  export default {
    name: "MessageDetail",
    data() {
      return {
        messageDetail: {}
      }
    },
    mounted() {
      setTimeout(() => {
        this.messageDetail = messageDetails.find(messageDetail => messageDetail.id === this.$route.params.id * 1)
      }, 1000)
    },
    watch: {
      $route: function (to) {
        this.messageDetail = messageDetails.find(messageDetail => messageDetail.id === to.params.id * 1)
      }
    }
  }
</script>

<style scoped>

</style>
