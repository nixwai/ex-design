import { format as fnsFormat } from 'date-fns';

/**
 * date类型或时间搓类型转对应时间格式
 * @param  {number|string|Date} value 时间
 * @param {string} format 格式
 */
export function formatDate(value, format) {
  if (typeof value !== 'number') {
    if ([undefined, null, ''].includes(value)) {
      return value;
    }
    // 转时间戳格式
    if (!isNaN(value)) {
      value = Number(value);
    } else {
      const timestamp = Date.parse(value);
      if (isNaN(timestamp)) {
        return value;
      }
      value = timestamp;
    }
  }
  return fnsFormat(value, format);
}
