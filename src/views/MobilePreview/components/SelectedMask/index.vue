<template>
  <transition name="van-fade">
    <div class="selector" v-show="visible" :style="style">
      <v-btn class="tools-item-top" v-show="isShowAdd" @click="addPlaceholder('before')" fab small>
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn class="tools-item-bottom" v-show="isShowAdd" @click="addPlaceholder('after')" fab small>
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import _ from 'lodash';
import { SET_PLACEHOLDER } from '@/store/mutation-types';
import { findComponentDom } from '@/utils/component';

const { mapState, mapMutations } = createNamespacedHelpers('page');
export default {
  data() {
    return {
      visible: false,
      style: {},
    };
  },
  computed: {
    ...mapState(['selectedComponent', 'placeholder']),
    hasSlot() {
      try {
        const { Slots } = this.selectedComponent.setting.config;
        return Slots && Slots.length;
      } catch (error) {
        return false;
      }
    },
    isShowAdd() {
      return Boolean(this.selectedComponent && this.selectedComponent.parent);
    },
  },
  watch: {
    placeholder: {
      deep: true,
      handler({ id }) {
        this.renderMask(id);
      },
    },
    selectedComponent: {
      handler({ id }) {
        this.renderMask(id);
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations([SET_PLACEHOLDER]),
    renderMask(id) {
      if (!id) {
        this.hideSelector();
        return;
      }
      setTimeout(() => {
        //! 必须确保在placeholer之后才能正确渲染
        this.showSelector(findComponentDom(id));
      }, 0);
    },
    addPlaceholder(direction) {
      this.SET_PLACEHOLDER({
        id: this.selectedComponent.id,
        direction,
        visible: true,
      });
    },
    showSelector(el) {
      if (!el) return;
      const {
        left, top, width, height,
      } = el.getBoundingClientRect();
      this.style = {
        left: `${left}px`,
        top: `${window.scrollY + top}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
      this.visible = true;
    },
    hideSelector() {
      this.visible = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
.selector {
  // pointer-events: none;
  position: absolute;
  // border: 4px solid #1976d2;
  border-radius: 2px;
  transform: translate3d(0, 0, 0);
  z-index: 99999999999;
  box-sizing: border-box;
  background: rgba(#1976d2, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  .tools-item {
    &-top {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      margin: 0;
      pointer-events: all;
    }

    &-bottom {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      margin: 0;
      pointer-events: all;
    }
  }
}
</style>
