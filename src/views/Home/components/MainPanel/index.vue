<template>
  <v-content>
    <v-container fill-height fluid class="main-view pa-0">
      <v-toolbar dense
                 flat>
        <v-btn-toggle v-model="panelView"
                      mandatory
                      class="transparent">
          <v-btn :value="1"
                 flat>
            <v-icon>smartphone</v-icon>
          </v-btn>
          <v-btn :value="2"
                 flat>
            <v-icon>code</v-icon>
          </v-btn>
          <!-- <v-btn :value="3"
                 flat>
            <v-icon>format_align_right</v-icon>
          </v-btn> -->
        </v-btn-toggle>
      </v-toolbar>
      <!-- <keep-alive> -->
      <preview-panel v-show="panelView===1"></preview-panel>
      <code-panel v-if="panelView===2"></code-panel>
      <!-- </keep-alive> -->
    </v-container>
  </v-content>
</template>

<script>
import PreviewPanel from '../PreviewPanel/index.vue';
import CodePanel from '../CodePanel/index.vue';

export default {
  data() {
    return {
      panelView: 1,
    };
  },
  components: {
    PreviewPanel,
    CodePanel,
  },
  mounted() {
    this.$bus.$on('changeMainPanel', (val) => {
      this.panelView = val;
    });
  },
};
</script>

<style lang="stylus">
.main-view {
  align-items: flex-start;
  flex-direction: column;
}
</style>
