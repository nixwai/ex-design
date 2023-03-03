export const inputProps = {
  /** 绑定值 */
  value: {
    type: [String, Number],
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
  /** 输入框前置内容 */
  prependText: {
    type: String,
    default: undefined
  },
  /** 输入框后置内容 */
  appendText: {
    type: String,
    default: undefined
  },
  /** 动态插槽 */
  slots: {
    type: Object,
    default: () => ({})
  }
};
