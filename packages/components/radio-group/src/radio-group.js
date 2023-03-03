export const radioProps = {
  /** 绑定值 */
  value: {
    type: [String, Number, Boolean],
    default: undefined
  },
  /** 对齐方式 */
  align: {
    type: String,
    default: 'left'
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
  /** 禁用选项的方法,返回是否禁用 */
  disabledMethod: {
    type: Function,
    default: () => false
  },
  /** 动态插槽 */
  slots: {
    type: Object,
    default: () => ({})
  },
  /** 选项是否撑满宽度 */
  full: {
    type: Boolean,
    default: false
  },
  /** 是否显示为边框样式 */
  border: {
    type: Boolean,
    default: false
  },
  /** 是否显示为按钮样式 */
  button: {
    type: Boolean,
    default: false
  }
};

export const radioEmits = ['change'];
