import WidgetChain, {
  Category, PropType, InputType,
} from '@/utils/widget';

export default new WidgetChain({
  label: '通告栏',
  tag: 'van-notice-bar',
  category: Category.View,
}).addProps([
  {
    key: 'text',
    label: '文字',
    propType: PropType.String,
    inputType: InputType.Text,
    default: '',
  },
  {
    key: 'color',
    label: '文字颜色',
    propType: PropType.String,
    inputType: InputType.Color,
    default: '#f60',
  },
  {
    key: 'background',
    label: '滚动条背景',
    propType: PropType.String,
    inputType: InputType.Color,
    default: '#fff7cc',
  },
]);
