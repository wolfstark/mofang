<template>
  <section>
    <v-system-bar status
                  lights-out>页面属性</v-system-bar>
    <v-container fluid>
      <v-layout row
                wrap>
        <v-flex xs12>
          <v-text-field v-model="name"
                        box
                        label="页面描述" />
        </v-flex>
      </v-layout>
    </v-container>
    <!-- </v-card-title> -->
    <!-- </v-card> -->
    <!-- </v-expansion-panel-content>
    </v-expansion-panel> -->
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { SET_NAME } from '@/store/mutation-types';

export default {
  computed: {
    name: {
      set(val) {
        this.$store.commit(`page/${SET_NAME}`, val);
      },
      get() {
        return this.$store.state.page.name;
      },
    },
  },
};
</script>

<style>
</style>
