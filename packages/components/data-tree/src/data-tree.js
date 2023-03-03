export const dataTreeProps = {
  /** api请求配置 */
  requestConfig: {
    type: Object,
    default: () => ({})
  },
  /**
   * 是否启用深拷贝，当data用于多个树渲染时需要启用，
   * 深拷贝下data与用于渲染树的数据互不影响，但数据量过大时将影响性能
   */
  deep: {
    type: Boolean,
    default: false
  },
  /** 是否可搜索 */
  filterable: {
    type: Boolean,
    default: false
  },
  /** 搜索提示 */
  filterTip: {
    type: String,
    default: '搜索'
  },
  /** 自定义筛选方法 */
  filterMethod: {
    type: Function,
    default: undefined
  },
  /** 节点的绑定值,parent:包括父级；child:仅含子级；all: 包含半选 */
  checkStrategy: {
    type: String,
    default: 'parent'
  }
};

export const dataTreeEmits = ['change', 'update:data', 'expand-node-change'];
