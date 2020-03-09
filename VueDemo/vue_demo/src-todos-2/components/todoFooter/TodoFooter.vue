<template>
  <div class="todo-footer">
    <label>
      <!--<input type="checkbox" v-model="isAllChecked"/>-->
      <slot name="checkAll"></slot>
    </label>
    <span>
          <!--<span>已完成{{completedTodos}}/ 全部{{todos.length}}</span>-->
      <slot name="countTodos"></slot>
        </span>
    <!--<button class="btn btn-danger" v-show="completedTodos" @click="deleteCompletedTodos">清除已完成任务</button>-->
    <slot name="delete"></slot>
  </div>
</template>

<script>
  export default {
    name: 'TodoFooter',
    props: {
      // todos: Array,
      // deleteCompletedTodos: Function,
      // selectAllTodos: Function
    },

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
