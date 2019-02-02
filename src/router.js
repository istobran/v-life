import Vue from 'vue';
import Router from 'vue-router';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Calendar = () => import(/* webpackChunkName: "calendar" */ './components/app/Calendar');
const Bookmark = () => import(/* webpackChunkName: "bookmark" */ './components/app/Bookmark');
const Setting = () => import(/* webpackChunkName: "setting" */ './components/app/Setting');
const Support = () => import(/* webpackChunkName: "support" */ './components/app/Support');
const AppEntry = () => import(/* webpackChunkName: "entry" */ './components/app/Entry');
const LoginPage = () => import(/* webpackChunkName: "login" */ './components/login/Login');
const RegisterPage = () => import(/* webpackChunkName: "register" */ './components/login/Register');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/app/home' },
    {
      path: '/app',
      component: AppEntry,
      redirect: '/app/home',
      children: [
        { path: 'home', component: Calendar },
        { path: 'work', component: Calendar },
        { path: 'activity', component: Calendar },
        { path: 'custom/:cid', name: 'custom', component: Calendar },
        { path: 'bookmark', component: Bookmark },
        { path: 'settings', component: Setting },
        { path: 'support', component: Support },
      ],
    },
    { path: '/login', meta: { auth: false }, component: LoginPage },
    { path: '/register', meta: { auth: false }, component: RegisterPage },
    { path: '*', redirect: '/' },
  ],
});

// 路由导航钩子
router.beforeEach(({ meta, path }, from, next) => {
  const { auth = true } = meta;
  const isLogin = Boolean(sessionStorage.getItem('stoken'));

  if (auth && !isLogin) {
    return next({ path: '/login' });
  }
  next();
});

export default router;
