import Calendar from './components/Calendar'
import Accounting from './components/Accounting'
import ServerStatus from './components/ServerStatus'
import IClock from './components/InternationalClock'

export default [
  { path: '/', redirect: '/calendar' },
  { path: '/calendar', component: Calendar },
  { path: '/accounting', component: Accounting },
  { path: '/s_status', component: ServerStatus },
  { path: '/in_clock', component: IClock },
  { path: '*', redirect: '/' }
]
