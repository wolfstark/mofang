<template>
  <codemirror ref="cm"
              :value="code"
              :options="cmOptions" />
</template>

<script>
import { codemirror } from 'vue-codemirror';
import { mapGetters, mapState } from 'vuex';
import 'codemirror/mode/vue/vue';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import Project from '@/services/models/Project';
import { stringifyComponent } from '@/utils/renderSfc';

export default {
  components: {
    codemirror,
  },
  data() {
    return {
      cmOptions: {
        tabSize: 2,
        theme: 'monokai',
        mode: 'text/x-vue',
        readOnly: true,
        lineNumbers: true,
        line: true,
      },
    };
  },
  computed: {
    ...mapState('page', ['components']),
    code() {
      return stringifyComponent(this.components);
    },
  },
};
</script>

<style lang="stylus">
.CodeMirror {
  height: auto;
}

// .CodeMirror-measure {
//   height: auto;
//   visibility: visible;
//   overflow: auto;
// }

.vue-codemirror {
  width: 100%;
  height: 100%;
  overflow: auto;
  flex: 1 1 auto;
}
</style>
