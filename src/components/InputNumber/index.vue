<template>
  <v-text-field v-bind="$attrs"
                v-model="value" />
</template>

<script>
export default {
  computed: {
    value: {
      set(val) {
        this.$listeners.input(val);
      },
      get() {
        return Number(this.$attrs.value);
      },
    },
  },
};
</script>

<style>
</style>
