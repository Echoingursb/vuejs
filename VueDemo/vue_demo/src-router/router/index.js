/*
路由器模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import MessageDetail from '../pages/MessageDetail'

Vue.use(VueRouter)


export default new VueRouter({
  // 配置n个路由
  routes: [
    {
      path: '/',
      redirect: '/about'
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [ // 配置嵌套路由
        {
          path: '/home/news',
          component: News
        },
        {
          path: 'message',
          component: Message,
          children: [
            {
              path: 'detail/:id',
              component: MessageDetail
            }
          ]
        },
        {
          path: '',
          redirect: '/home/news'
        }
      ]
    }
  ]
})

