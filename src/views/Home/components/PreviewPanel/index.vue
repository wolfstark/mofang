<template>
  <v-layout class="grid"
            align-center>
    <!--  TODO:或许可以通过webpack entry彻底解耦出来(但vue-cli-plugin-electron-builder似乎会破坏多页构建)   -->
    <webview ref="webview"
             nodeintegration
             useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
             class="preview-mobile"
             src="./index.html/#/mobile-preview"></webview>
  </v-layout>
</template>

<script>
import { THREAD_STATE_SYNC } from '@/store/mutation-types';
import { STATE_SYNC, RENDER_TO_WEBVIEW } from '@/constant';

export default {
  mounted() {
    const webview = this.$refs.webview; // eslint-disable-line
    // 主渲染接收
    webview.addEventListener('ipc-message', (event) => {
      //! 消息属性叫channel，有些奇怪，但就是这样
      this.$store.dispatch(STATE_SYNC, event.channel);
    });
    this.unSubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes(THREAD_STATE_SYNC)) return;
      // 主线程发送
      webview.send(RENDER_TO_WEBVIEW, state);
    });
  },
  destroyed() {
    this.unSubscribe();
  },
};
</script>

<style lang="stylus">
.grid {
  overflow: auto;
  width: 100%;
  justify-content: center;
  background: #ddd;
  background-image: linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 0), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 0);
  background-size: 15px 15px, 15px 15px;

  .preview-mobile {
    box-sizing: border-box;
    background: #fff;
    width: 375px;
    height: 98%;
    box-shadow: 0 14px 45px rgba(0, 0, 0, 0.247059), 0 10px 18px rgba(0, 0, 0, 0.219608);
  }
}
</style>
