import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: true,
    today: moment(),
    curr: {
      moment: null,
      year: 0,
      month: 0
    },
    navList: {
      custom: window.localStorage['v-life-custom']
        ? JSON.parse(window.localStorage['v-life-custom'])
        : [{
          name: '个人日历',
          icon: 'date_range',
          color: '#616161',
          link: { name: 'custom', params: { cid: 1 } }
        }]
    },
    showCreateMenuDialog: false,
    showBookmarkDialog: false
  },
  mutations,
  getters,
  actions
})
