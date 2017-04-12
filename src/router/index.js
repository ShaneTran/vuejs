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
import Login from '@/components/Login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false },
      beforeEnter: function(to, from, next) {
        // if (!store.getters.checkLogined) {
        //   // next('/login');
        // } else {
        //   // next();
        // }
      }
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/new',
      name: 'user_create',
      component: UserNew,
      meta: { requiresAuth: true }
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodoList,
      meta: { requiresAuth: true }
    },
    {
      path: '/todos/:id',
      name: 'todoEdit',
      component: TodoEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userID', component: User,
      meta: { requiresAuth: true },
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
