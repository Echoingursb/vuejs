<template>
  <div class="todo-header">
    <h2>你好</h2>
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add"
           v-model="title"/>
  </div>
</template>

<script>
  export default {
    name: 'TodoHeader',
    data() {
      return {
        title: ''
      }
    },
    props: {
      addTodo: Function
    },
    methods: {
      add() {
        let {addTodo, title} = this
        let todo = {
          title,
          isCompleted: false
        }
        if (!title.trim()) {
          alert('标题不能为空')
          return
        }
        addTodo(todo)
        // this.$emit('addTodo', todo) // 触发事件
        this.title = ''
      }
    }
  }
</script>

<style scoped>
  /*header*/
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }

</style>
