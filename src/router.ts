import Vue from 'vue'
import Router from 'vue-router'

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Calendar = () => import(/* webpackChunkName: "calendar" */ './views/todo/calendar/Calendar.vue')
const TaskList = () => import(/* webpackChunkName: "taskList" */ './views/todo/tasklist/TaskList.vue')
const Bookmark = () => import(/* webpackChunkName: "bookmark" */ './views/bookmark/Bookmark.vue')
const Setting = () => import(/* webpackChunkName: "setting" */ './views/todo/Setting.vue')
const Support = () => import(/* webpackChunkName: "support" */ './views/todo/Support.vue')
const AppEntry = () => import(/* webpackChunkName: "entry" */ './views/todo/Entry.vue')
const LoginPage = () => import(/* webpackChunkName: "login" */ './views/login/Login.vue')
const RegisterPage = () => import(/* webpackChunkName: "register" */ './views/login/Register.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/todo/taskList' },
    {
      path: '/todo',
      component: AppEntry,
      redirect: '/todo/taskList',
      children: [
        { path: 'calendar', name: 'calendar', component: Calendar },
        { path: 'taskList', name: 'taskList', component: TaskList },
        { path: 'settings', name: 'settings', component: Setting },
        { path: 'support', name: 'support', component: Support }
      ]
    },
    { path: '/bookmark', component: Bookmark },
    { path: '/login', meta: { auth: false }, component: LoginPage },
    { path: '/register', meta: { auth: false }, component: RegisterPage },
    { path: '*', redirect: '/' }
  ]
})

export default router
