<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="comments.length === 0">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <ItemComment v-for="(comment, index) in comments" :key="index" :comment="comment"
                   :deleteComment="deleteComment" :index="index"/>
    </ul>
  </div>
</template>

<script>
  import ItemComment from '../itemComment/ItemComment'

  export default {
    name: "ListComment",
    // 一个组件想要接收父组件传递给它的数据，必须要声明
    props: ['comments', 'deleteComment'], // 声明接受属性：这个属性就会成为组件对象的属性(只指定属性名)，在模版中可以直接读取，类似data
    components: {
      ItemComment
    }
  }
</script>

<style scoped>
  .reply {
    margin-top: 0;
  }

</style>
