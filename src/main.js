import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
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
    { path: '/calendar', component: Calendar },
    { path: '/accounting', component: Accounting },
    { path: '/s_status', component: ServerStatus },
    { path: '/in_clock', component: IClock },
    { path: '*', redirect: '/' }
  ]
})

/* Vue2.0 的写法 */
new Vue({
  el: 'app',
  router,
  render: h => h(App)       // ES6 lambda表达式
})
