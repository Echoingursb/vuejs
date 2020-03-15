<template>
  <li @mouseenter="handleMouseMove(true)" @mouseleave="handleMouseMove(false)" :style="{backgroundColor: bgColor}">
    <label>
      <input type="checkbox" v-model="todo.isCompleted"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="remove(index)">删除</button>
  </li>
</template>

<script>
  import PubSub from 'pubsub-js'

  export default {
    name: 'TodoItem',
    data () {
      return {
        bgColor: '#fff', // 默认的背景颜色
        isShow: false // 默认按钮是否显示
      }
    },
    props: {
      todo: Object,
      index: Number,
      deleteTodo: Function
    },
    methods: {
      handleMouseMove: function (isActive) {
        if (isActive) {
          this.bgColor = '#eee'
          this.isShow = true
        } else {
          this.bgColor = '#fff'
          this.isShow = false
        }
      },
      remove: function () {
        let {deleteTodo, index, todo} = this
        if (confirm(`确定删除${todo.title}吗？`)) {
          deleteTodo(index)
        }
      }
    },
    mounted() {
      // PubSub.publish('deleteTodo', this.index)
    }
  }
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    /* float: left; */
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    /*display: none;*/
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }


</style>
