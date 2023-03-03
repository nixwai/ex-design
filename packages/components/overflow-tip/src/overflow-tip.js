export const overflowTipProps = {
  /** 显示文本 */
  text: {
    type: String,
    default: ''
  },
  /** 最大宽度 */
  maxWidth: {
    type: [String, Number],
    default: '100%'
  },
  /** 显示省略号 */
  ellipsis: {
    type: Boolean,
    default: true
  },
  /** 位置 */
  placement: {
    type: String,
    default: 'top'
  },
  /** 文本是否为html格式 */
  isHtml: {
    type: Boolean,
    default: false
  }
};
