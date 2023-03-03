export const resizeContentProps = {
  /** 收起时按钮的偏移量 */
  offset: {
    type: [Number, String],
    default: 0
  },
  /** 拖拽的最大宽度 */
  maxWidth: {
    type: String,
    default: 'none'
  },
  /** 拖拽的最小宽度 */
  minWidth: {
    type: String,
    default: '150px'
  },
  /** 是否启用大小调节 */
  resizable: {
    type: Boolean,
    default: true
  },
  /** 展开时内容样式，会在收起时失效 */
  contentStyle: {
    type: Object,
    default: undefined
  }
};
