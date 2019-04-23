import Vue from 'vue';
import Vuex from 'vuex';
import page from './modules/page';
import * as types from './mutation-types';
import { STATE_SYNC } from '@/constant';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {
    [STATE_SYNC]({ commit }, state) {
      commit(`page/${types.THREAD_STATE_SYNC}`, state.page);
    },
  },
  modules: {
    page,
  },
});
export default store;
