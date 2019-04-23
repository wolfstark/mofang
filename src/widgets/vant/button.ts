import WidgetChain, {
  Category, PropType, InputType, DEFAULT_SLOT,
} from '@/utils/widget';

export default new WidgetChain({
  label: '按钮',
  tag: 'van-button',
  category: Category.View,
})
  .addProps([
    {
      key: 'type',
      label: '类型',
      propType: PropType.String,
      default: 'default',
      inputType: InputType.Select,
      data: [
        {
          value: 'default',
          label: '默认按钮',
        },
        {
          value: 'primary',
          label: '主要按钮',
        },
        {
          value: 'warning',
          label: '警告按钮',
        },
        {
          value: 'danger',
          label: '危险按钮',
        },
      ],
    },
    {
      key: 'size',
      label: '尺寸',
      propType: PropType.String,
      default: 'normal',
      inputType: InputType.Select,
      data: [
        {
          value: 'normal',
          label: '正常',
        },
        {
          value: 'large',
          label: '大',
        },
        {
          value: 'small',
          label: '中',
        },
        {
          value: 'mini',
          label: '小',
        },
      ],
    },
    {
      key: 'text',
      label: '文字',
      propType: PropType.String,
      inputType: InputType.Text,
    },
  ])
  .addSlots([DEFAULT_SLOT])
  .addListeners([
    {
      key: 'click',
      label: '按钮点击',
    },
  ]);
