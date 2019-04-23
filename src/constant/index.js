export const LIB_MAP = {
  vant: '/lib/',
  'magic-ui': '/lib/',
};

export const PageStatus = {
  OFFLINE: 0,
  ONLINE: 1,
};

export const RENDER_TO_WEBVIEW = 'RENDER_TO_WEBVIEW';

export const STATE_SYNC = 'stateSync';

export const InputType = {
  Select: 'InputSelect',
  Switch: 'InputSwitch',
  Text: 'InputText',
  Image: 'InputImage',
  Color: 'InputColor',
  Number: 'InputNumber',
  Array: 'InputArray',
  Object: 'InputObject',
};
// postmessage 只能传输json格式,类型系统不能使用构造函数
export const PropType = {
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
  Array: 'Array',
  Object: 'Object',
  Date: 'Date',
  Function: 'Function',
  Symbol: 'Symbol',
};

export const Category = {
  Layout: '布局组件',
  View: '视图组件', // ui组件
  // Form: '表单组件', // 表单 输入
  // Action: 'action', // 反馈 输出
  Business: '业务组件', // 业务
};

export const Style = [
  {
    key: 'backgroundColor',
    label: '背景色',
    type: PropType.String,
    inputType: InputType.Color,
  },
  {
    key: 'backgroundImage',
    label: '背景图',
    type: PropType.String,
    inputType: InputType.Image,
  },
  {
    key: 'backgroundSize',
    label: '背景尺寸',
    type: PropType.String,
    inputType: InputType.Select,
    data: [{
      value: 'contain',
      label: '全覆盖',
    },
    {
      value: 'cover',
      label: '紧凑',
    },
    ],
  },
  {
    key: 'padding',
    label: '内边距',
    type: PropType.String,
    inputType: InputType.Text,
  },
  // {
  //   key: 'backgroundColor',
  //   label: '背景色',
  //   type: Type.Number,
  //   inputType: InputType.Text,
  //   default: null,
  // },
];
