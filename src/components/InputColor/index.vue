<template>
  <v-menu :close-on-content-click="false"
          v-model="modal"
          style="flex: 1 1 auto;"
          lazy
          transition="scale-transition"
          offset-y
          full-width>
    <v-text-field slot="activator"
                  v-bind="$attrs"
                  v-on="$listeners"
                  :value="value"
                  readonly></v-text-field>
    <chrome-picker :value="colors"
                   disableAlpha
                   @input="handleColor">
    </chrome-picker>
  </v-menu>
</template>

<script>
import { Chrome } from 'vue-color';

export default {
  name: 'InputColor',
  props: {
    value: String,
  },
  data() {
    return {
      modal: false,
      colors: { hex: this.value },
    };
  },
  methods: {
    handleColor({ hex }) {
      this.$emit('input', hex).$emit('change');
    },
  },
  components: {
    'chrome-picker': Chrome,
  },
};
</script>

<style>
</style>
