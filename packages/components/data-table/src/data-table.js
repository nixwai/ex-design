export const tableProps = {
  /** 数据 */
  data: {
    type: Array,
    default: undefined
  },
  /** 列配置 */
  columns: {
    type: Array,
    default: () => []
  },
  /** 加载 */
  loading: {
    type: Boolean,
    default: false
  },
  /** api请求配置 */
  requestConfig: {
    type: Object,
    default: () => ({})
  },
  /** 列批量配置 */
  columnsConfig: {
    type: Object,
    default: () => ({})
  },
  /** 金额格式配置 */
  moneyConfig: {
    type: Object,
    default: () => ({})
  },
  /** 工具栏配置 */
  toolbarConfig: {
    type: Object,
    default: () => ({})
  },
  /** 树结构配置 */
  treeConfig: {
    type: Object,
    default: undefined
  },
  /** 表尾的数据获取方法 */
  footerMethod: {
    type: Function,
    default: undefined
  },
  /** 是否显示表尾 */
  showFooter: {
    type: Boolean,
    default: false
  }
};

export const tabletEmits = ['select', 'update:data', 'unit-change', 'expand-all-change'];
