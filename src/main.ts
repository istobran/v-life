import 'Styles/normalize.scss'
import 'Styles/utility.scss'
import 'vuetify/src/stylus/app.styl'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VuetifyMessage from 'Plugins/message'
import VuetifyConfirm from 'Plugins/confirm'
import Notify from 'Plugins/notification'
import Colors from 'vuetify/lib/util/colors'
import App from './App.vue'
import router from './router'
import store from './store'
// import MockData from './mock'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: Colors.blue.darken4, // #E53935
    secondary: Colors.grey.lighten4, // #FFCDD2
    accent: Colors.indigo.base // #3F51B5
  }
})
Vue.use(VuetifyMessage)
Vue.use(VuetifyConfirm)
Vue.use(Notify)
// Vue.use(MockData);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
