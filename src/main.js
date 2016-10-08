import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Sidebar from './components/Sidebar.vue'
import Calendar from './components/Calendar.vue'
import Accounting from './components/Accounting.vue'
import ServerStatus from './components/ServerStatus.vue'
import IClock from './components/InternationalClock.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/calendar' },
    { path: '/calendar', components: { sidebar: Sidebar, main: Calendar } },
    { path: '/accounting', components: { sidebar: Sidebar, main: Accounting } },
    { path: '/s_status', components: { sidebar: Sidebar, main: ServerStatus } },
    { path: '/in_clock', components: { sidebar: Sidebar, main: IClock } },
    { path: '*', redirect: '/' }
  ]
})

/* Vue2.0 的写法 */
new Vue({
  el: 'app',
  router,
  render: h => h(App)       // ES6 lambda表达式
})
