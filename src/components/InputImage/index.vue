<template>
  <v-text-field v-bind="$attrs"
                v-on="$listeners"
                :value="value"
                readonly
                @click="openImageDialog" />
</template>

<script>
import { ipcRenderer } from 'electron';
import putFile from '@/services/models/putFile';


export default {
  name: 'InputImage',
  props: {
    value: String,
    format: String,
  },
  methods: {
    openImageDialog() {
      ipcRenderer.send('open-image-dialog');
      ipcRenderer.on('selected-image', async (event, path) => {
        // console.log(path);
        const src = await putFile(path);
        if (this.format === 'css') {
          this.$emit('input', `url(${src})`);
        } else {
          this.$emit('input', src);
        }
        // debugger;
        // this.$attrs.value = src;
      });
    },
  },
};
</script>

<style>
</style>
