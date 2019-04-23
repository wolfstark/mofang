<template>
  <!-- darwin => mac -->
  <v-system-bar v-if="isNeedBar"
                status
                style="-webkit-app-region: drag;"
                color="#404040"
                app>
    <v-spacer></v-spacer>
    <!-- <v-icon>network_wifi</v-icon>
    <v-icon>signal_cellular_null</v-icon>
    <v-icon>battery_full</v-icon>
    <span>12:30</span> -->
  </v-system-bar>
</template>

<script>
import { remote } from 'electron';
import Toast from '@/plugins/Toast';

const win = remote.getCurrentWindow();

export default {
  data() {
    return {
      isFullScreen: win.isFullScreen(),
    };
  },
  computed: {
    isNeedBar(isFullScreem) {
      if (process.platform === 'darwin') {
        return !this.isFullScreen;
      }
      return false;
    },

  },
  mounted() {
    win.on('enter-full-screen', () => {
      this.isFullScreen = true;
    });
    win.on('leave-full-screen', () => {
      this.isFullScreen = false;
    });
  },
  destroyed() {
    win.removeAllListeners('enter-full-screen');
    win.removeAllListeners('leave-full-screen');
  },
};
</script>

<style>
</style>
