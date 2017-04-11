import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Users from '@/components/Users'
import User from '@/components/User'
import UserDetail from '@/components/UserDetail'
import UserPosts from '@/components/UserPosts'
import UserNew from '@/components/UserNew'
import TodoList from '@/components/TodoList'
import TodoEdit from '@/components/TodoEdit'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/user/new',
      name: 'user_create',
      component: UserNew
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodoList
    },
    {
      path: '/todos/:id',
      name: 'todoEdit',
      component: TodoEdit
    },
    {
      path: '/user/:userID', component: User,
      children: [
        {
          path: '',name: 'user', component: UserDetail
        },
        {
          path: 'posts', name: 'user_post', component: UserPosts
        },
      ]
    }
  ]
})
