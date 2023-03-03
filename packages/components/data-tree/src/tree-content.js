export const treeContentProps = {
  /** 绑定值 */
  value: {
    type: [String, Number, Array, Boolean],
    default: undefined
  },
  /** 加载 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 数据 */
  data: {
    type: Array,
    default: () => []
  },
  /** 定义label字段 */
  labelKey: {
    type: String,
    default: 'label'
  },
  /** 定义value字段 */
  valueKey: {
    type: String,
    default: 'value'
  },
  /** 子级字段 */
  childKey: {
    type: String,
    default: 'children'
  },
  /** 筛选目标的字段组，没有时选择labelKey */
  filterKeys: {
    type: Array,
    default: () => []
  },
  /** 高亮筛选内容，注意：使用时无法使用自定义内容插槽，可使用labelHtml替换 */
  highlightFilter: {
    type: Boolean,
    default: true
  },
  /** 筛选高亮的颜色 */
  filterColor: {
    type: String,
    default: '#f22b2b'
  },
  /**  使用${}拼接字段，支持html格式，'我叫${name}性别${sex}' */
  labelHtml: {
    type: String,
    default: undefined
  },
  /** 开启虚拟滚动时的最大行数 */
  gt: {
    type: [Number, String],
    default: 100
  },
  /** 树类型：checkbox/radio */
  type: {
    type: String,
    default: undefined
  },
  /** 禁用选项的方法,返回是否禁用 */
  disabledMethod: {
    type: Function,
    default: () => false
  },
  /** 是否显示选择图标 */
  showSelectIcon: {
    type: Boolean,
    default: true
  },
  /** 是否高亮当前选中节点 */
  highlightCurrent: {
    type: Boolean,
    default: true
  },
  /** 单选框下，选中之后是否允许取消 */
  cancelable: {
    type: Boolean,
    default: true
  },
  /** 是否在点击节点的时候选中节点，false时只有在点击选框时才会选中节点 */
  checkOnClickNode: {
    type: Boolean,
    default: true
  },
  /** 是否默认展开的所有节点 */
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  /** 复选框的情况下，是否遵循父子不互相关联的做法 */
  noRelationship: {
    type: Boolean,
    default: false
  },
  /** 复选框的情况下，是否遵循子关联，而父不关联的做法 */
  childRelationship: {
    type: Boolean,
    default: false
  },
  /** 相邻级节点间的水平缩进，单位为像素 */
  indent: {
    type: Number,
    default: 18
  },
  /** 是否显示头部 */
  showHeader: {
    type: Boolean,
    default: false
  },
  /** 头部信息显示文本 */
  headerTitle: {
    type: String,
    default: '全部'
  },
  /** 复选框的情况下，是否可选择全部 */
  selectAll: {
    type: Boolean,
    default: true
  },
  /** 是否显示展开全部按钮 */
  expandAll: {
    type: Boolean,
    default: true
  },
  /** 是否显示搜索无关节点 */
  showIrrelevantNodes: {
    type: Boolean,
    default: false
  },
  /** 是否在点击节点后展开或收缩节点 */
  expandOnClick: {
    type: Boolean,
    default: true
  },
  /** 默认展开项 */
  defaultExpandedKeys: {
    type: Array,
    default: () => []
  },
  /** 是否使用手风琴展开模式 */
  accordion: {
    type: Boolean,
    default: false
  }
};

export const treeContentTreeEmits = ['change', 'expand-all-change', 'expand-node-change'];
