import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    showMenu: true
  },
  mutations,
  getters,
  actions
});
