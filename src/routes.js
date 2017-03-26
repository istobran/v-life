import Calendar from './components/app/Calendar'
import AppEntry from './components/app/Entry'
import LoginPage from './components/login/Login'

export default [
  { path: '/', redirect: '/app/calendar' },
  { path: '/app', component: AppEntry,
    children: [
      { path: 'calendar', component: Calendar }
    ]
  },
  { path: '/login', meta: { auth: false }, component: LoginPage },
  { path: '*', redirect: '/' }
]
