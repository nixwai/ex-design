export const treeSelectProps = {
  /** 子节点key */
  childKey: {
    type: String,
    default: 'children'
  },
  /** 节点的绑定值,parent:包括父级；child:仅含子级；all: 包含半选 */
  checkStrategy: {
    type: String,
    default: 'parent'
  },
  /** 高亮筛选内容，注意：使用时无法使用自定义内容插槽，可使用labelHtml替换 */
  highlightFilter: {
    type: Boolean,
    default: false
  },
  /** 是否显示选择图标 */
  showSelectIcon: {
    type: Boolean,
    default: undefined
  }
};

export const treeSelectEmits = ['change', 'remove-tag', 'update:options'];
