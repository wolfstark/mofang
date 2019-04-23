<template>
  <v-navigation-drawer app
                       width="240"
                       clipped
                       permanent>
    <v-layout column
              fill-height>
      <v-toolbar dense
                 flat>
        <v-btn-toggle v-model="panelView"
                      mandatory
                      class="transparent">
          <v-btn :value="1"
                 flat>
            <v-icon>playlist_add</v-icon>
          </v-btn>
          <v-btn :value="2"
                 flat>
            <v-icon>format_align_right</v-icon>
          </v-btn>
          <!-- <v-btn :value="3"
               flat>
          <v-icon>format_align_right</v-icon>
        </v-btn>
        <v-btn :value="4"
               flat>
          <v-icon>format_align_justify</v-icon>
        </v-btn> -->
        </v-btn-toggle>
      </v-toolbar>
      <v-flex class="overflow-auto">
        <component-panel v-show="panelView===1"></component-panel>
        <tree-panel v-if="panelView===2"></tree-panel>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import ComponentPanel from '@/views/Home/components/ComponentPanel/index.vue';
import TreePanel from '@/views/Home/components/TreePanel/index.vue';

export default {
  data() {
    return {
      panelView: 1,
    };
  },
  components: {
    ComponentPanel,
    TreePanel,
  },
};
</script>

<style scoped>
.overflow-auto {
  overflow: auto;
}
</style>
