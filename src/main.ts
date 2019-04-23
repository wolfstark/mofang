import Vue from 'vue';
import './plugins/bus';
import App from './App.vue';
import router from '@/router';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import '@/widgets';
import mixins from './mixins/base';
import { createProvider } from './plugins/vue-apollo';

Vue.config.productionTip = false;

// installWidgets(Vue);
Vue.mixin(mixins);

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
} as any).$mount('#app');
