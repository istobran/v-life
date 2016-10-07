/*
  Vue version 1.0
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Calendar from './components/Calendar'

Vue.use(VueRouter)

var router = new VueRouter({
  history: true
})
router.map({
  '/calendar' : {
    component: Calendar
  }
})
router.redirect({
  '*': '/calendar'
})
router.start(App, 'app')
