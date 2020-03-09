<template>
  <div id="app">
    <div>
      <header class="site-header jumbotron">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <h1>请发表对Vue的评论</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <AddComment :addComment="addComment"/>
        <ListComment :comments="comments" :deleteComment="deleteComment"/>
      </div>
    </div>
  </div>
</template>

<script>
  import AddComment from './components/addComment/AddComment'
  import ListComment from './components/listComment/ListComment'

  export default {
    name: "App",
    data() {
      return {
        comments: [
          {
            name: 'Alice',
            content: '太难了'
          },
          {
            name: 'Bob',
            content: '很简单'
          },
          {
            name: 'Cat',
            content: '很容易'
          }
        ]
      }
    },
    components: {
      AddComment,
      ListComment
    },
    methods: {
      addComment: function (comment) {
        this.comments.unshift(comment);
      },
      deleteComment: function (index) {
        this.comments.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
