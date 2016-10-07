import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Sidebar from './components/Sidebar.vue'
import Calendar from './components/Calendar.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', components: { sidebar: Sidebar, main: Calendar } }
  ]
})

/* Vue2.0 的写法 */
new Vue({
  el: 'app',
  router,
  render: h => h(App)       // ES6 lambda表达式
})
