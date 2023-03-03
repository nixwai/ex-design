<template>
  <div ref="gridRef" class="ex-grid">
    <slot :col="responsiveCol" :row="row" />
  </div>
</template>

<script>
export default {
  name: 'ExGrid',
  inheritAttrs: false
};
</script>

<script setup>
import { gridProps } from './grid';
import { provide, ref, watch } from 'vue';
import { useResponsiveCount } from './useResponsiveCount';
import { useResizeObserver } from '../../../hooks/useResizeObserver';

const props = defineProps(gridProps);

const gridRef = ref();
const child = ref([]);
const childLen = ref(0);
const gridWidth = ref(0);
/** 宽度调整 */
function handleResize(entry) {
  child.value = gridRef.value?.children ?? [];
  childLen.value = child.value.length;
  gridWidth.value = entry.target.clientWidth;
}
// 添加变化监听
useResizeObserver(gridRef, handleResize);
const responsiveCol = useResponsiveCount(props.cols, gridWidth);
/** grid行数 */
const row = ref(0);
watch([responsiveCol, childLen], ([curCol, curLen], [preCol, perLen]) => {
  if (curCol !== preCol || curLen !== perLen) {
    const col = responsiveCol.value;
    let len = 0;
    for (let i = 0; i < childLen.value; i++) {
      const dom = child.value[i];
      const remainder = col - (len % col);
      const giCol = Number(dom?.__vue__?.getGiCol() || 1);
      // 占用列为offset加span，最多不超过col
      const num = giCol > col ? col : giCol;
      // 发生过行时需要额外占用空白位置
      len += remainder >= num ? num : remainder + num;
    }
    row.value = Math.ceil(len / col);
  }
});

provide('gridInfo', {
  gridCol: responsiveCol,
  xGap: props.xGap,
  gridWidth: gridWidth
});
</script>

<style scoped>
.ex-grid {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(v-bind(responsiveCol), minmax(0, 1fr));
  gap: v-bind(props.yGap + 'px') v-bind(props.xGap + 'px');
  width: 100%;
}
</style>
