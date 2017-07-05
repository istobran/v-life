import Vue from 'vue'
import VueRouter from 'vue-router'
import CommonFn from './commonFn'
// import MockData from './mock'
import App from './App'
import routes from './routes'
import { store } from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueRouter);
Vue.use(VueMaterial);
// Vue.use(MockData);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});
// 路由导航钩子
router.beforeEach(({ meta, path }, from, next) => {
  var { auth = true } = meta;
  var isLogin = Boolean(sessionStorage.getItem("stoken"));

  if (auth && !isLogin) {
    return next({ path: '/login' });
  }
  next();
});

/* Vue2.0 的写法 */
new Vue({
  el: 'app',
  router,
  store,
  render: h => h(App)       // ES6 lambda表达式
});
