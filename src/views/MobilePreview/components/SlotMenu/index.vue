<template>
  <transition>
    <div v-show="value"
         class="slotMenu"
         :style="{left:`${x}px`,top:`${y}px`}">
      <v-list subheader
              dense>
        <v-list-tile v-for="slot in slots"
                     :key="slot.name"
                     @drop.native.stop="handleDropInSlot(slot.name)"
                     @dragover.native.prevent>
          <v-list-tile-title>{{slot.name}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    slots: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleDropInSlot(name) {
      this.$emit('dropInSlot', name);
    },
  },
};
</script>
<style lang="stylus" scoped>
.slotMenu {
  position: absolute;
  display: inline-block;
  border-radius: 2px;
  max-width: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  contain: content;
  will-change: transform;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  min-width: 0px;
  transform-origin: left top 0px;
  z-index: 8;
  // transition: left 0.1s, top 0.3s;
}
</style>
