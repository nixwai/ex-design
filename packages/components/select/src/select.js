export const selectProps = {
  /** 绑定值 */
  value: {
    type: [String, Number, Array, Boolean],
    default: undefined
  },
  /** 提供输入提示的名称 */
  label: {
    type: String,
    default: ''
  },
  /** 对齐方式 */
  align: {
    type: String,
    default: 'left'
  },
  /** 加载 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 选项 */
  options: {
    type: Array,
    default: () => []
  },
  /** 选项的标签key */
  labelKey: {
    type: String,
    default: 'label'
  },
  /** 选项的值key */
  valueKey: {
    type: String,
    default: 'value'
  },
  /** 分组的子级key，设置后选项将进行分组 */
  groupKey: {
    type: String,
    default: undefined
  },
  /** 子节点key */
  childKey: {
    type: String,
    default: undefined
  },
  /** 是否多选 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 是否折叠tags */
  collapseTags: {
    type: Boolean,
    default: false
  },
  /** 禁用选项的方法,返回是否禁用 */
  disabledMethod: {
    type: Function,
    default: () => false
  },
  /** 显示选项的方法,返回是否显示 */
  hideMethod: {
    type: Function,
    default: () => false
  },
  /** 自定义筛选方法 */
  filterMethod: {
    type: Function,
    default: undefined
  },
  /** 筛选的key */
  filterKeys: {
    type: Array,
    default: () => []
  },
  /** 是否搜索 */
  remote: {
    type: Boolean,
    default: false
  },
  /** 是否搜索 */
  remoteMethod: {
    type: Function,
    default: undefined
  },
  /** 全选 */
  selectAll: {
    type: Boolean,
    default: false
  },
  /** 动态插槽 */
  slots: {
    type: Object,
    default: () => ({})
  },
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
  }
};

export const selectEmits = ['change', 'update:options'];
