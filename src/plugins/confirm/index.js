import Confirm from './Confirm.vue';

function Install(Vue, opts) {
  const property = (opts && opts.property) || '$confirm';
  function createDialogCmp(options) {
    return new Promise(resolve => {
      const cmp = new Vue(Object.assign(Confirm, {
        destroyed: () => {
          document.body.removeChild(cmp.$el);
          resolve(cmp.value);
        },
      }));
      Object.assign(cmp, Vue.prototype.$confirm.options || {}, options);
      document.body.appendChild(cmp.$mount().$el);
    });
  }

  function show(message, options = {}) {
    options.message = message;
    return createDialogCmp(options);
  }

  Vue.prototype[property] = show;
  Vue.prototype[property].options = opts || {};
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Install);
}

export default Install;
