export const cascaderProps = {
  /** 提供输入提示的名称 */
  label: {
    type: String,
    default: ''
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
  /** 对齐方式 */
  align: {
    type: String,
    default: 'left'
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
  }
};

export const cascaderEmits = ['update:options'];
