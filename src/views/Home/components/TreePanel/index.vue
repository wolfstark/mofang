<template>
  <section>
    <v-system-bar status
                  lights-out>组件树</v-system-bar>
    <v-treeview :items="componentTree"
                :active.sync="component"
                open-all
                activatable></v-treeview>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import { recursiveMap, recursiveFind } from '@/utils';
import { SET_SELECTED_COMPONENT } from '@/store/mutation-types';

export default {
  data() {
    return {
      component: [],
    };
  },
  computed: {
    ...mapState('page', ['components', 'selectedComponent']),
    componentTree() {
      if (!this.components) return [];
      return recursiveMap(
        // this.components.filter(_ => _.setting.label !== 'style'),
        this.components,
        _ => ({
          id: _.id,
          name: _.setting.label,
        }),
        'props.slots',
      );
    },
  },
  watch: {
    selectedComponent(component) {
      this.component = component ? [component.id] : [];
    },
    component(val, oldVal) {
      // 没有点击或者和上次一样则不处理
      if (!val[0] || val[0] === oldVal[0]) return;
      const component = recursiveFind(
        this.components,
        _ => _.id === val[0],
        'props.slots',
      );
      this.SET_SELECTED_COMPONENT(component);
    },
  },
  methods: {
    ...mapMutations('page', [SET_SELECTED_COMPONENT]),
  },
};
</script>
