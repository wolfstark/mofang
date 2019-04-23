import WidgetChain, {
  Category, PropType, InputType, DEFAULT_SLOT,
} from '@/utils/widget';

export default new WidgetChain({
  tag: 'bm-image',
  label: '图片',
  category: Category.View,
})
  .addProps([
    {
      key: 'src',
      label: '图片',
      propType: PropType.String,
      inputType: InputType.Image,
    },
    {
      key: 'lazyload',
      label: '懒加载',
      propType: PropType.Boolean,
      default: false,
      inputType: InputType.Switch,
    },
    {
      key: 'aspect-ratio',
      label: '纵横比',
      propType: PropType.String,
      inputType: InputType.Text,
    },
    {
      key: 'contain',
      label: '全显示',
      propType: PropType.Boolean,
      default: false,
      inputType: InputType.Switch,
    },
    {
      key: 'height',
      label: '高度',
      propType: PropType.String,
      inputType: InputType.Text,
    },
    {
      key: 'width',
      label: '宽度',
      propType: PropType.String,
      inputType: InputType.Text,
    },
  ])
  .addSlots([DEFAULT_SLOT]);
