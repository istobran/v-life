import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';
import router from './router';
import store from './store';
// import MockData from './mock'
import 'vue-material/dist/vue-material.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMaterial);
// Vue.use(MockData);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
