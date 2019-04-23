import {
  InputType, PropType, Category, Style,
} from '@/constant';

export interface ConstructorOption {
  label: string;
  tag: string;
  category: string;
}

export interface WidgetProp {
  key: string;
  label: string;
  propType: string;
  inputType: string;
  default?: any;
  required?: boolean;
  data?: any[];
}

export interface WidgetSlot {
  name: string;
  label: string;
}

export interface WidgetListener {
  key: string;
  label: string;
}

export interface WidgetConfig {
  Props: WidgetProp[];
  Slots: WidgetSlot[];
  Listeners: WidgetListener[];
}

export interface DefaultProps {
  slots: ComponentInfo[];
  style: {};
  listeners: ListenersInfo;
}
export interface ListenersInfo {
  [event: string]: TaskInfo[];
}

export interface TaskInfo {
  name: string;
  option: any;
}

export interface ComponentInfo extends Widget {
  id: string;
  parent: string;
  slot: string;
}
export interface Widget {
  props: DefaultProps;
  setting: WidgetSetting;
}
export interface WidgetSetting extends ConstructorOption {
  lib: string;
  module: string;
  config: WidgetConfig;
}

const DEFAULT_SLOT = {
  name: 'default',
  label: '默认',
};

export {
  InputType, PropType, Category, DEFAULT_SLOT,
};
/**
 * @export
 * @class WidgetChain
 */
export default class WidgetChain {
  /**
   * @private
   * @type {WidgetSetting}
   * @memberof WidgetChain
   */
  private setting: WidgetSetting;

  /**
   *Creates an instance of WidgetChain.
   * @param {ConstructorOption} { label, tag, category }
   * @memberof WidgetChain
   */
  constructor({ label, tag, category }: ConstructorOption) {
    this.setting = {
      label,
      tag,
      category,
      lib: '',
      module: '',
      config: {
        Props: [],
        Slots: [],
        Listeners: [],
      },
    };
  }

  private static createStyle($style) {
    return $style.reduce((pre, { key }) => {
      pre[key] = null; //eslint-disable-line
      return pre;
    }, {});
  }

  private static createListener(Listeners) {
    return Listeners.reduce((pre, { key }) => {
      pre[key] = []; //eslint-disable-line
      return pre;
    }, {});
  }

  private static createProps(config: WidgetConfig): DefaultProps {
    /**
     * @desc 接受组件传参props，合并组件声明,return Props默认值
     * @param props 组件传参props
     */
    return config.Props.reduce(
      (pre, { key, default: defaultValue }) => {
        pre[key] = defaultValue; //eslint-disable-line
        return pre;
      },
      {
        slots: [],
        style: WidgetChain.createStyle(Style),
        listeners: WidgetChain.createListener(config.Listeners),
      },
    );
  }

  /**
   * @param {WidgetProp[]} props
   * @returns
   * @memberof WidgetChain
   */
  addProps(props: WidgetProp[]) {
    this.setting.config.Props = [...this.setting.config.Props, ...props];
    return this;
  }

  /**
   * @param {WidgetSlot[]} slots
   * @returns
   * @memberof WidgetChain
   */
  addSlots(slots: WidgetSlot[]) {
    this.setting.config.Slots = [...this.setting.config.Slots, ...slots];
    return this;
  }

  addListeners(listeners: WidgetListener[]) {
    this.setting.config.Listeners = [...this.setting.config.Listeners, ...listeners];
    return this;
  }

  /**
   * @param {string} lib
   * @param {string} module
   * @memberof WidgetChain
   */
  setMeta(lib: string, module: string) {
    this.setting.lib = lib;
    this.setting.module = module;
    return this;
  }

  /**
   * @returns {Widget}
   * @memberof WidgetChain
   */

  toWidget(): Widget {
    return {
      // TODO: 目前props结构有很大问题，组件props和slots，style,listeners等耦合在一起
      props: WidgetChain.createProps(this.setting.config), // props是组件等默认值，不被修改
      setting: this.setting,
    };
  }
}
