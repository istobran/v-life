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
// 路由导航钩子
router.beforeEach(({ meta, path }, from, next) => {
  var { auth = true } = meta;
  var isLogin = Boolean(""); //true用户已登录， false用户未登录

  if (auth && !isLogin) {
    return next({ path: '/login' });
  }
  next();
});

/* Vue2.0 的写法 */
new Vue({
  el: 'app',
  router,
  render: h => h(App)       // ES6 lambda表达式
});
