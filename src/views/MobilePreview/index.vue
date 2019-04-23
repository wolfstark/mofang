<template>
  <div id="wrapper"
       ref="wrapper"
       @contextmenu.prevent
       @click="handleMouseDown">
    <components-view></components-view>
    <selected-mask></selected-mask>
    <placeholder @drop.native="handleDrop"
                 @dragover.native.prevent></placeholder>
  </div>
</template>

<script>
import '@/plugins/vant';
import '@/plugins/magic-ui';
import SelectedMask from '@/views/MobilePreview/components/SelectedMask/index.vue';
import Placeholder from '@/views/MobilePreview/components/Placeholder/index.vue';
import ComponentsView from '@/views/MobilePreview/components/ComponentsView';
import componentMixins from '@/mixins/component';
import { createNamespacedHelpers } from 'vuex';
import { RENDER_TO_WEBVIEW, STATE_SYNC } from '@/constant';
import lodash from 'lodash';
import { recursiveFind } from '@/utils';
import {
  SET_SELECTED_COMPONENT,
  SET_SELECTED_WIDGET,
  THREAD_STATE_SYNC,
} from '@/store/mutation-types';
import { ipcRenderer } from 'electron';
import store from '@/store';

const { mapMutations: pageMutations } = createNamespacedHelpers('page');

// 没必要放在钩子里，尽快执行不容易错过数据同步
ipcRenderer.on(RENDER_TO_WEBVIEW, (e, message) => {
  store.dispatch(STATE_SYNC, message);
});

store.subscribe((mutation, state) => {
  if (mutation.type.includes(THREAD_STATE_SYNC)) return;
  // 副线程发送
  ipcRenderer.sendToHost(state);
});

export default {
  name: 'MobilePreview',
  components: {
    SelectedMask,
    ComponentsView,
    Placeholder,
  },
  mixins: [componentMixins],
  data() {
    return {};
  },
  methods: {
    ...pageMutations([SET_SELECTED_COMPONENT]),

    // drop触发组件挂载
    handleDrop() {
      // slot drop
      if (this.selectedWidget) {
        this.handleDropInPage();
      }
    },
    // dragover触发slot提示
    // handleDragOver: lodash.throttle(
    //   function handleDragOver({ path, x, y }) {
    //     if (!this.components) return;
    //     const component = this.selectComponent(path);
    //     if (!component) this.SET_SELECTED_COMPONENT(null);
    //     // 避免在drop后多执行一次
    //   },
    //   150,
    //   { trailing: false },
    // ),

    // 全局捕获鼠标点击，选择组件
    handleMouseDown({ path }) {
      // left or right click
      // if ([0, 2].includes(button) && path.length);
      if (this.components) this.selectComponent(path);
    },

    selectComponent(path) {
      let component = null;
      for (let index = 0; index < path.length; index += 1) {
        const element = path[index];
        if (element.dataset && element.dataset.uid) {
          component = recursiveFind(
            this.components,
            _ => _.id === element.dataset.uid,
            'props.slots',
          );
          if (component) {
            this.SET_SELECTED_COMPONENT(component);
            return component;
          }
        }
      }
      return null;
    },
  },
  created() {
    // TODO: 改为oop 便于维护
    // webview环境接收
  },
  destroyed() {
    ipcRenderer.removeAllListeners(RENDER_TO_WEBVIEW);
  },
};
</script>
<style>
#wrapper {
  min-height: 100vh;
  font-size: 0;
}
</style>
