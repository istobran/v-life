import Calendar from './components/app/Calendar'
import AppEntry from './components/app/Entry'
import LoginPage from './components/login/Login'

export default [
  { path: '/', redirect: '/app/home' },
  { path: '/app', component: AppEntry,
    children: [
      { path: 'home', component: Calendar },
      { path: 'work', component: Calendar },
      { path: 'activity', component: Calendar },
      { path: 'custom/:cid', name:"custom", component: Calendar },
      { path: 'bookmark', component: Calendar },
      { path: 'settings', component: Calendar },
      { path: 'help', component: Calendar }
    ]
  },
  { path: '/login', meta: { auth: false }, component: LoginPage },
  { path: '*', redirect: '/' }
]
