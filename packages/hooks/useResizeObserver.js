import { ResizeObserver } from '@juggle/resize-observer';
import { onBeforeUnmount, onMounted } from 'vue';

/** 被监听元素集合 */
const elHandlersMap = new Map();
/** 页面内元素变化的监听者 */
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = elHandlersMap.get(entry.target);
    if (handler !== undefined) {
      handler(entry);
    }
  }
});

/**
 * 监听元素大小变化
 * @param domRef 元素
 * @param handleResize 变化时触发的事件
 */
export function useResizeObserver(domRef, handleResize) {
  onMounted(() => {
    observer.observe(domRef.value);
    elHandlersMap.set(domRef.value, handleResize);
  });
  onBeforeUnmount(() => {
    const dom = domRef.value;
    if (!elHandlersMap.has(dom)) {
      return;
    }
    elHandlersMap.delete(dom);
    observer.unobserve(dom);
  });
}
