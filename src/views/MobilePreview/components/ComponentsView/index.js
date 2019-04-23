import componentMixins from '@/mixins/component';
import Vue from 'vue';
import { bindObject } from '@/utils';

export default {
  mixins: [componentMixins],
  render(h) {
    return this.components ? this.renderSlot(this.components) : null;
  },
  methods: {
    renderSlot(component) {
      const {
        id: _id,
        setting: { tag },
        props,
      } = component;

      const slots = component.props.slots.map(item => this.renderSlot(item));
      // debugger;
      const Component = Vue.component(tag);
      const VNodeData = bindObject(new Component(), props);
      // FIXME: aqwe
      return this.$createElement(
        tag,
        {
          attrs: {
            ...VNodeData.attrs,
            'data-uid': _id,
            // ...props,//? 为什么要加这行代码？
          },
          props: VNodeData.props,
          // domProps: props.domProps,
          class: props.class && props.class.split(' '),
          style: props.style,
        },
        slots.length ? slots : null,
      );
    },
  },
};
