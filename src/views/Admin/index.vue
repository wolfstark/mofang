<template>
  <v-app dark>
    <title-panel></title-panel>
    <top-panel v-model="tabIndex"></top-panel>
    <v-content>
      <v-container fluid
                   class="d-block"
                   fill-height>
        <v-tabs-items v-model="tabIndex"
                      max>
          <v-tab-item>
            <pages-panel></pages-panel>
          </v-tab-item>
          <v-tab-item>
            <div>施工中</div>
          </v-tab-item>
          <v-tab-item>
            <div>施工中</div>
          </v-tab-item>
          <v-tab-item>
            <div>施工中</div>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TitlePanel from '@/components/TitlePanel/index.vue';
import TopPanel from './components/TopPanel/index.vue';
import PagesPanel from './components/PagesPanel/index.vue';
import Toast from '@/plugins/Toast';
import { ipcRenderer, remote } from 'electron';
// import { autoUpdater } from 'electron-updater';
import Update from '@/services/models/autoUpdater';
import '../../plugins/vuetify';

export default {
  name: 'Admin',
  data() {
    return {
      tabIndex: null,
    };
  },
  components: {
    TitlePanel,
    TopPanel,
    PagesPanel,
  },
  mounted() {
    // Toast.loading();
    ipcRenderer.on('updateMessage', (event, text) => {
      Toast(text);
    });
    ipcRenderer.send('checkForUpdate');

    // ipcRenderer.on('updateMessage', (event, text) => {
    //   Toast(text);
    // });
    // autoUpdater.checkForUpdates();
  },
  destroyed() {},
  created() {
    this.process = process;
  },
};
</script>

<style scoped>
.main-view {
  align-items: flex-start;
  flex-direction: column;
}
</style>
<style lang="stylus">
@import '../../assets/style/native.styl';
</style>
