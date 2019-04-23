<template>
  <div v-if="placeholder.visible"
       class="placeholder">
    添加至此处
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { findComponentDom } from '@/utils/component';

const { mapState } = createNamespacedHelpers('page');

export default {
  methods: {
    move(id, direction) {
      if (!id) return;

      const componentDom = findComponentDom(id);
      if (direction === 'before') {
        componentDom.parentNode.insertBefore(this.$el, componentDom);
      } else {
        componentDom.parentNode.insertBefore(
          this.$el,
          componentDom.nextSibling,
        );
      }
    },
  },
  computed: {
    ...mapState(['placeholder']),
  },
  watch: {
    placeholder: {
      deep: true,
      handler({ id, direction }) {
        this.$nextTick(() => {
          this.move(id, direction);
        });
      },
    },
    // components: {
    //   deep: true,
    //   handler() {
    //     // this.$nextTick(this.move);
    //   },
    // },
  },
};
</script>
<style lang="stylus" scoped>
.placeholder {
  position: relative;
  display: flex;
  height: 135px;
  width: 100%;
  background: #F9F9F9;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    bottom: 8px;
    left: 8px;
    border: 1px dashed rgba(0, 0, 0, 0.85);
    border-radius: 4px;
  }
}
</style>
