export const moreSelectProps = {
  /** 下拉选择宽度 */
  optionWidth: {
    type: String,
    default: 'auto'
  },
  /** 开启虚拟滚动时的最大行数 */
  gt: {
    type: [Number, String],
    default: 100
  },
  /** 是否折叠tags */
  collapseTags: {
    type: Boolean,
    default: false
  },
  /** 多选时，最多可显示的tags数量，超出时自动折叠 */
  maxTags: {
    type: [String, Number],
    default: 100
  },
  /** 折叠时，是否显示所有选中的标签 */
  collapseTagsTooltip: {
    type: Boolean,
    default: false
  }
};

export const moreSelectEmits = ['change', 'remove-tag', 'update:options'];
