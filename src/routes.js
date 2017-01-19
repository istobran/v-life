import Calendar from './components/app/Calendar'
import Accounting from './components/app/Accounting'
import ServerStatus from './components/app/ServerStatus'
import IClock from './components/app/InternationalClock'
import AppEntry from './components/app/Entry'
import LoginPage from './components/login/Login'

export default [
  { path: '/', redirect: '/app/calendar' },
  { path: '/app', component: AppEntry,
    children: [
      { path: 'calendar', component: Calendar },
      { path: 'accounting', component: Accounting },
      { path: 's_status', component: ServerStatus },
      { path: 'in_clock', component: IClock }
    ]
  },
  { path: '/login', meta: { auth: false }, component: LoginPage },
  { path: '*', redirect: '/' }
]
