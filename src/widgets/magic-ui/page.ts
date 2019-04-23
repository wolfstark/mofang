import WidgetChain, {
  Category, PropType, InputType, DEFAULT_SLOT,
} from '@/utils/widget';

// export default new WidgetChain({}).addProps([]).addSlots([DEFAULT_SLOT]);

export default new WidgetChain({
  label: '页面',
  tag: 'bm-page',
  category: Category.Layout,
})
  .addProps([
    {
      key: 'title',
      label: '头名称',
      propType: PropType.String,
      default: '无标题',
      inputType: InputType.Text,
    },
  ])
  .addSlots([DEFAULT_SLOT]);
