<template>
  <div class="col-md-4">
    <form class="form-horizontal">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="用户名" v-model="name">
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-default pull-right" @click="addSubmit">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "AddComment",
    data() {
      return {
        name: '',
        content: ''
      }
    },
    props: {
      addComment: Function
    },
    methods: {
      addSubmit: function () {
        let {name, content} = this;
        let comment = {
          name,
          content
        };
        if (!name.trim() || !content.trim()) {
          alert(`姓名或者内容不能为空`);
          return;
        }
        this.addComment(comment);
        this.name = '';
        this.content = '';
      }
    }


  }
</script>

<style scoped>

</style>
