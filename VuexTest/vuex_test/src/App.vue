<template>
  <div id="app">
    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
          <!--<todo-header @addTodo="addTodo"/>-->
          <!--使用 $on(eventName) 监听事件 -->
          <todo-header ref="todoHeader"/>
          <todo-list :todos="todos"/>
          <!--<todo-footer :todos="todos" :deleteCompletedTodos="deleteCompletedTodos" :selectAllTodos="selectAllTodos"/>-->
          <todo-footer>
            <input type="checkbox" v-model="isAllChecked" slot="checkAll"/>
            <span slot="countTodos">已完成{{completedTodos}}/ 全部{{todos.length}}</span>
            <button class="btn btn-danger" v-show="completedTodos" @click="deleteCompletedTodos" slot="delete">清除已完成任务</button>
          </todo-footer>
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
  import storageUtil from './util/storageUtil'

  export default {
    name: 'App',
    data() {
      return {
        // todos: []
        // 从localStorage读取todos
        // todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
        todos: storageUtil.readTodos()

      }
    },
    computed: {
      completedTodos() {
        // return this.todos.reduce((acc, cur) => acc + (cur.isCompleted ? 1 : 0), 0)
        let {todos} = this;
        return todos.reduce((acc, cur) => acc + (cur.isCompleted ? 1 : 0), 0)
      },
      isAllChecked: {
        get() {
          return this.completedTodos === this.todos.length && this.completedTodos > 0
        },
        set(value) { // value是当前checkbox最新的值
          this.selectAllTodos(value)
        }
      }
    },
    watch: { // 监视(监视内部数据的改变)
      todos: {
        deep: true, // 深度监视
        // handler: function (value) {
        //   // 将todos最新的值保存到localStorage
        //   // window.localStorage.setItem('todos_key', JSON.stringify(value))
        //   storageUtil.saveTodos(value)
        // }
        handler: storageUtil.saveTodos
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
      // 使用 $on(eventName) 监听事件
      this.$refs.todoHeader.$on('addTodo', this.addTodo)

      PubSub.subscribe('deleteTodo', (msg, index) => { // 订阅消息
        this.deleteTodo(index)
      })
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
