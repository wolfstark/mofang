import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import zhHans from 'vuetify/src/locale/zh-Hans';

Vue.use(Vuetify, {
  theme: {
    // primary: '#C20C0C',
    // secondary: '#424242',
    // accent: '#82B1FF',
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107',
  },
  iconfont: 'md',
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
});
