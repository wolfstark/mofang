<template>
  <v-toolbar app
             dense
             tabs
             clipped-left
             clipped-right>
    <v-tabs color="transparent" v-model="tabIndex"
            style="position: absolute;"
            centered>
      <v-tab>
        页面
      </v-tab>
      <v-tab>
        记录
      </v-tab>
      <v-tab>
        人员
      </v-tab>
      <v-tab>
        概览
      </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <!-- <v-toolbar-items>
      <v-btn flat>导入</v-btn>
    </v-toolbar-items> -->
    <v-btn :to="{name:'Home'}"
           color="primary">创建</v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    value: [Number, String],
  },
  data() {
    return {};
  },
  computed: {
    tabIndex: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    createHandle() {
      // this.
    },
  },
};
</script>

<style>
</style>
