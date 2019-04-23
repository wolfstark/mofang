<template>
  <v-navigation-drawer app
                       width="240"
                       clipped
                       right
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
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn :value="2"
                 flat>
            <v-icon>description</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-toolbar>
      <v-flex class="overflow-auto">
        <attr-panel v-show="panelView===1"></attr-panel>
        <option-panel v-show="panelView===2"></option-panel>
      </v-flex>
    </v-layout>

  </v-navigation-drawer>
</template>

<script>
import AttrPanel from '@/views/Home/components/AttrPanel/index.vue';
import OptionPanel from '@/views/Home/components/OptionPanel/index.vue';

export default {
  data() {
    return {
      panelView: 1,
    };
  },
  components: {
    AttrPanel,
    OptionPanel,
  },
};
</script>

<style scoped>
.overflow-auto {
  overflow: auto;
  display: flex;
  flex-direction: column;
}
</style>
