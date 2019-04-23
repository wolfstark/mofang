import WidgetChain, {
  Category, PropType, InputType, DEFAULT_SLOT,
} from '@/utils/widget';

export default new WidgetChain({
  label: '大转盘',
  tag: 'bm-turntable-container',
  category: Category.Business,
})
  .addProps([
    {
      key: 'activity-no',
      label: '活动编号',
      propType: PropType.String,
      inputType: InputType.Text,
      required: true,
    },
    {
      key: 'primary-color',
      label: '主颜色',
      propType: PropType.String,
      default: '#FBF7EF',
      inputType: InputType.Color,
    },
    {
      key: 'second-color',
      label: '副颜色',
      propType: PropType.String,
      default: '#FBF7EF',
      inputType: InputType.Color,
    },
    {
      key: 'tip-color',
      label: '提示次数颜色',
      propType: PropType.String,
      default: '#785B23',
      inputType: InputType.Color,
    },
  ])
  .addSlots([DEFAULT_SLOT]);
