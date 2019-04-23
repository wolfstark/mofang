import { recursiveFind, recursiveSpliceBy } from '@/utils';
import * as types from '../mutation-types';

function defaultVal() {
  return {
    components: null,
    name: '无标题',
    selectedComponent: null,
    selectedWidget: null,
    placeholder: {
      visible: true,
      id: null,
      direction: null, // before || after
    },
  };
}

export default {
  namespaced: true,
  state() {
    return defaultVal();
  },
  mutations: {
    [types.ADD_PAGE_COMPONENT](state, component) {
      if (!state.components) {
        state.components = component;
        return;
      }
      throw new Error('root组件已经存在');
    },
    [types.SET_PLACEHOLDER](state, placeholder) {
      state.placeholder = placeholder;
    },
    [types.SET_NAME](state, name) {
      state.name = name;
    },
    [types.THREAD_STATE_SYNC](state, payload) {
      Object.assign(state, payload);
    },
    // 添加根组件
    [types.ADD_COMPONENT](state, component) {
      if (state.placeholder.id) {
        let index = state.components.props.slots.findIndex(
          comp => comp.id === state.placeholder.id,
        );
        if (index === -1) {
          state.components.props.slots.push(component);
          return;
        }
        if (state.placeholder.direction === 'after') {
          index += 1;
        }
        state.components.props.slots.splice(index, 0, component);
      } else {
        state.components.props.slots.push(component);
      }
    },
    [types.SET_SELECTED_COMPONENT](state, component) {
      state.selectedComponent = component;
    },
    [types.ADD_COMPONENT_SLOT](state, { id, slot }) {
      const component = recursiveFind(state.components, _ => _.id === id, 'props.slots');
      if (!component) return;
      component.props.slots.push(slot);
    },
    [types.DEL_COMPONENT](state, { id }) {
      // if (state.components.id === id) {
      //   state.components = [];
      //   return;
      // }
      recursiveSpliceBy(state.components, _ => _.id === id, 'props.slots');
    },
    [types.UPDATE_COMPONENT](state, { id, props }) {
      const component = recursiveFind(state.components, _ => _.id === id, 'props.slots');
      if (!component) return;
      Object.assign(component, {
        props,
      });
    },
    [types.SET_PROJECT](state, project) {
      Object.assign(state, project);
    },
    // [types.SET_SLOT_MENU](state, slotMenu) {
    //   state.slotMenu = slotMenu;
    // },
    [types.SET_SELECTED_WIDGET](state, widget) {
      state.selectedWidget = widget;
    },
  },
  actions: {
    selectWidget({ commit }, widget) {
      commit(types.SET_SELECTED_WIDGET, widget);
    },
    resetProject({ commit }) {
      commit(types.SET_PROJECT, defaultVal());
    },
    loadProject({ commit }, { module }) {
      commit(types.SET_PROJECT, module);
    },
    addComponent({ commit }, component) {
      commit(types.ADD_COMPONENT, component);
      commit(types.SET_PLACEHOLDER, {
        visible: false,
        id: null,
        direction: null, // before || after
      });
      commit(types.SET_SELECTED_COMPONENT, component);
    },
    deleteComponent({ commit }, component) {
      commit(types.DEL_COMPONENT, component);
      commit(types.SET_SELECTED_COMPONENT, {});
    },
  },
};
