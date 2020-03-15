/*
使用LocalStorage存储数据的工具模块
向外暴露
1. 函数
2. 对象
 */
const TODOS_KEY = 'todos_key'

export default {
  /**
   *  从localStoage写入数据
   *
   * @param todos 要写入的todos
   */
  saveTodos(todos) {
    window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  },

  /**
   *
   * 从localStorage读取数据
   *
   * @returns {any}
   */
  readTodos() {
    return JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
  }
}
