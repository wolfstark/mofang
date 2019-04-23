import shortid from 'shortid';
import _ from 'lodash';
import { Vue, Component } from 'vue-property-decorator';
import { Widget, ComponentInfo } from '../utils/widget';
import {
  SET_SELECTED_WIDGET,
  SET_SELECTED_COMPONENT,
  ADD_COMPONENT_SLOT,
} from '../store/mutation-types';

@Component
export default class ComponentMixin extends Vue {
  get components(): ComponentInfo {
    return this.$store.state.page.components;
  }

  get selectedComponent(): ComponentInfo {
    return this.$store.state.page.selectedComponent;
  }

  get selectedWidget(): Widget {
    return this.$store.state.page.selectedWidget;
  }

  // eslint-disable-next-line class-methods-use-this
  getGuid(): string {
    return shortid.generate();
  }

  /**
   * 根据所选widget创建组件信息
   */
  createComponentInfo(id: string, parent: string, slot: string): ComponentInfo {
    const { props, setting } = this.selectedWidget;

    return {
      id,
      parent,
      slot,
      props: _.cloneDeep(props),
      setting: _.cloneDeep(setting),
    };
  }

  handleDropInSlot() {
    const { Slots } = this.selectedComponent.setting.config;
    const hasSlot = Slots && Slots.length;

    if (hasSlot && Slots.length === 1) {
      this.handleSelectSlot({
        slotName: Slots[0].name,
      });
    } else {
      this.$store.commit(`page/${SET_SELECTED_WIDGET}`);
    }
  }

  handleDropInPage() {
    const id = this.getGuid();
    // TODO: target.id应该是固定的容器id
    const component = this.createComponentInfo(id, this.components.id, null);
    // *用于解决vtree的bug
    // if (this.components) this.$store.dispatch('page/deleteComponent', this.components);

    this.$store.dispatch('page/addComponent', component);
    this.$store.commit(`page/${SET_SELECTED_WIDGET}`, null);
  }

  handleSelectSlot({ slotName }) {
    const { id } = this.selectedComponent;
    const component = this.createComponentInfo(this.getGuid(), id, slotName);
    // TODO: vm.$slots这种方式更加符合vue自身特性，props.slot有点奇淫巧技
    this.$store.commit(`page/${ADD_COMPONENT_SLOT}`, {
      id,
      slot: component,
    });
    this.$store.commit(`page/${SET_SELECTED_WIDGET}`, null);
    this.$store.commit(`page/${SET_SELECTED_COMPONENT}`, component);
  }

  selectWidget(widget: Widget) {
    this.$store.dispatch('page/selectWidget', widget);
  }
}
