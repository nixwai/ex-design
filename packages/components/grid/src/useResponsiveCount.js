import { computed } from 'vue';

/** 响应式计算 */
export function useResponsiveCount(value, domWidth) {
  const responsiveList = value.toString().split(' ');
  responsiveList[0] = '0:' + responsiveList[0];
  /** 保存各个宽度的数 */
  const responsiveObj = {};
  responsiveList.forEach((item) => {
    const [width, col] = item.split(':');
    responsiveObj[width] = col;
  });
  const widthList = Object.keys(responsiveObj).sort((a, b) => b - a);

  /** 当前宽度对应的值 */
  const responsiveCount = computed(() => {
    const width = widthList.find((item) => domWidth.value >= item);
    return responsiveObj[width];
  });

  return responsiveCount;
}
