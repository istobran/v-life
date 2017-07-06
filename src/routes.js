import Calendar from './components/app/Calendar'
import Bookmark from './components/app/Bookmark'
import Setting from './components/app/Setting'
import Support from './components/app/Support'
import AppEntry from './components/app/Entry'
import LoginPage from './components/login/Login'
import RegisterPage from './components/login/Register'

export default [
  { path: '/', redirect: '/app/home' },
  { path: '/app', component: AppEntry,
    redirect: "/app/home",
    children: [
      { path: 'home', component: Calendar },
      { path: 'work', component: Calendar },
      { path: 'activity', component: Calendar },
      { path: 'custom/:cid', name:"custom", component: Calendar },
      { path: 'bookmark', component: Bookmark },
      { path: 'settings', component: Setting },
      { path: 'support', component: Support }
    ]
  },
  { path: '/login', meta: { auth: false }, component: LoginPage },
  { path: '/register', meta: { auth: false }, component: RegisterPage },
  { path: '*', redirect: '/' }
]
