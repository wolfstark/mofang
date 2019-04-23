import Vue from 'vue';

const $bus = new Vue();
Vue.use({
  install() {
    Vue.prototype.$bus = $bus;
  },
});

export default $bus;
