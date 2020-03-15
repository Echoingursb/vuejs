<template>
  <div id="app">
    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
          <todo-header :addTodo="addTodo"/>
          <todo-list :todos="todos" :deleteTodo="deleteTodo"/>
          <todo-footer :todos="todos" :deleteCompletedTodos="deleteCompletedTodos" :selectAllTodos="selectAllTodos"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/todoHeader/TodoHeader'
  import TodoList from './components/todoList/TodoList'
  import TodoFooter from './components/todoFooter/TodoFooter'

  export default {
    name: 'App',
    data() {
      return {
        // todos: []
        // 从localStorage读取todos
        todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
        // todos: JSON.parse(window.localStorage.getItem('todos_key'))
      }
    },
    watch: { // 监视(监视内部数据的改变)
      todos: {
        deep: true, // 深度监视
        handler: function (value) {
          // 将todos最新的值JSON数据保存到localStorage
          window.localStorage.setItem('todos_key', JSON.stringify(value))
        }
      }
    },
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    methods: {
      addTodo: function (todo) {
        this.todos.unshift(todo)
      },
      deleteTodo: function (index) {
        this.todos.splice(index, 1)
      },
      // 删除所有选中的todo
      deleteCompletedTodos: function () {
        this.todos = this.todos.filter(todo => !todo.isCompleted)
      },
      // 全选/全不选
      selectAllTodos: function (isChecked) {
        this.todos.forEach(todo => todo.isCompleted = isChecked)
      }
    },
    mounted() {
      // this.$refs.todoHeader.$on('addTodo', this.addTodo)
      // PubSub.subscribe('deleteTodo', (msg, index) => {
      //   this.deleteTodo(index)
      // })
    }
  }
</script>

<style scoped>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

</style>
