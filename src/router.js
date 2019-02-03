import Vue from 'vue';
import Router from 'vue-router';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Calendar = () => import(/* webpackChunkName: "calendar" */ './views/calendar/Calendar');
const Bookmark = () => import(/* webpackChunkName: "bookmark" */ './views/bookmark/Bookmark');
const Setting = () => import(/* webpackChunkName: "setting" */ './views/app/Setting');
const Support = () => import(/* webpackChunkName: "support" */ './views/app/Support');
const AppEntry = () => import(/* webpackChunkName: "entry" */ './views/app/Entry');
const LoginPage = () => import(/* webpackChunkName: "login" */ './views/login/Login');
const RegisterPage = () => import(/* webpackChunkName: "register" */ './views/login/Register');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/app/calendar' },
    {
      path: '/app',
      component: AppEntry,
      redirect: '/app/calendar',
      children: [
        { path: 'calendar', component: Calendar },
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
// router.beforeEach(({ meta, path }, from, next) => {
//   const { auth = true } = meta;
//   const isLogin = Boolean(sessionStorage.getItem('stoken'));

//   if (auth && !isLogin) {
//     return next({ path: '/login' });
//   }
//   next();
// });

export default router;
