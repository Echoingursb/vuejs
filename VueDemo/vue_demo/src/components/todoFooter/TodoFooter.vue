<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isAllChecked"/>
    </label>
    <span>
          <span>已完成{{completedTodos}}/ 全部{{todos.length}}</span>
        </span>
    <button class="btn btn-danger" v-show="completedTodos > 0" @click="deleteCompletedTodos">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'TodoFooter',
    props: {
      todos: Array,
      deleteCompletedTodos: Function,
      selectAllTodos: Function
    },
    computed: {
      completedTodos () {
        // return this.todos.reduce((acc, cur) => acc + (cur.isCompleted ? 1 : 0), 0)
        let {todos} = this;
        return todos.reduce((acc, cur) => acc + (cur.isCompleted ? 1 : 0), 0)
      },
      isAllChecked: {
        get () {
          return this.completedTodos === this.todos.length && this.completedTodos > 0
        },
        set (value) { // value是当前checkbox最新的值
          this.selectAllTodos(value)
        }
      }
    }
  }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
