export const editNumberProps = {
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
  /** 对齐方式: left center right */
  align: {
    type: String,
    default: 'left'
  },
  /** 显示千分符格式 */
  thousands: {
    type: Boolean,
    default: false
  },
  /** 精度 */
  precision: {
    type: [Number, String],
    default: 2
  },
  /** 精度 */
  step: {
    type: [Number, String],
    default: 0
  },
  /** 最大值 */
  max: {
    type: [Number, String],
    default: Infinity
  },
  /** 最小值 */
  min: {
    type: [Number, String],
    default: -Infinity
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
    default: () => {}
  }
};

export const editNumberEmits = ['change'];
