<template>
  <component :is="comInput"
             v-bind="$attrs"
             v-on="$listeners"></component>
</template>

<script>
import InputColor from '../InputColor/index.vue';
import InputImage from '../InputImage/index.vue';
import InputNumber from '../InputNumber/index.vue';
import InputObject from '../InputObject/index.vue';
import InputSwitch from '../InputSwitch/index.vue';
import InputSelect from '../InputSelect/index.vue';
import InputText from '../InputText/index.vue';
import { InputType } from '@/constant';

export default {
  inheritAttrs: false,
  props: {
    type: {
      type: String,
    },
  },
  components: {
    InputColor,
    InputImage,
    InputNumber,
    InputObject,
    InputSwitch,
    InputSelect,
    InputText,
  },
  computed: {
    comInput() {
      return this.type || InputType.Text;
    },
  },
};
</script>

<style>
</style>
