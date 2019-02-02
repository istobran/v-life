import Vue from 'vue';
import Vuex from 'vuex';
import { createModule } from 'vuex-toast';
import moment from 'moment';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showMenu: true,
    today: moment(),
    curr: {
      moment: null,
      year: 0,
      month: 0,
    },
    navList: {
      common: [
        {
          name: '生活', icon: 'home', color: '#43A047', link: '/app/home',
        },
        {
          name: '工作', icon: 'work', color: '#1E88E5', link: '/app/work',
        },
        {
          name: '活动', icon: 'extension', color: '#FB8C00', link: '/app/activity',
        },
      ],
      custom: window.localStorage['v-life-custom']
        ? JSON.parse(window.localStorage['v-life-custom'])
        : [{
          name: '个人日历',
          icon: 'date_range',
          color: '#616161',
          link: { name: 'custom', params: { cid: 1 } },
        },
        ],
      feature: [
        {
          name: '便签', icon: 'bookmark', color: '#E53935', link: '/app/bookmark',
        },
      ],
      other: [
        {
          name: '设置', icon: 'settings', color: '#616161', link: '/app/settings',
        },
        {
          name: '帮助', icon: 'help', color: '#616161', link: '/app/support',
        },
      ],
    },
    showCreateMenuDialog: false,
    showBookmarkDialog: false,
  },
  mutations,
  getters,
  actions,
  modules: {
    toast: createModule({ dismissInterval: 3000 }),
  },
});
