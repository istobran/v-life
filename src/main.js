import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import MockData from './mock'
import App from './App'
import routes from './routes'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MockData);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});

/* Vue2.0 的写法 */
new Vue({
  el: 'app',
  router,
  render: h => h(App)       // ES6 lambda表达式
});
