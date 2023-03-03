<template>
  <div class="ex-gi">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ExGi',
  inheritAttrs: false
};
</script>

<script setup>
import { computed, inject } from 'vue';
import { useResponsiveCount } from './useResponsiveCount';

const props = defineProps({
  /** 占用的栅格栏数 */
  span: {
    type: [String, Number],
    default: 1
  },
  /** 偏移量 */
  offset: {
    type: [String, Number],
    default: 0
  }
});

const { gridCol, xGap, gridWidth } = inject('gridInfo');
const responsiveCount = useResponsiveCount(props.span, gridWidth);
/** 占据的列数 */
const responsiveSpan = computed(() => {
  if (responsiveCount.value === 'full') {
    return Number(gridCol.value);
  }
  return Number(responsiveCount.value);
});
const responsiveOffset = useResponsiveCount(props.offset, gridWidth);
/** 总列数 */
const giCol = computed(() => Number(responsiveSpan.value) + Number(responsiveOffset.value));
/** 计算偏移 */
// eslint-disable-next-line no-unused-vars
const marLeft = computed(() => {
  const offset = responsiveOffset.value;
  const col = giCol.value;
  if (offset) {
    return `calc((100% - (${col} - 1) * ${xGap}px) / ${col} * ${offset} + ${xGap}px * ${offset})`;
  }
  return 0;
});
/** 计算宽度 */
// eslint-disable-next-line no-unused-vars
const giWidth = computed(() => {
  const col = giCol.value;
  const span = responsiveSpan.value;
  return `calc(${span} / ${col} * (100% - ${span} * ${xGap}px) + (${span} - 1) * ${xGap}px))`;
});

defineExpose({
  getGiCol: () => giCol.value
});
</script>

<style scoped>
.ex-gi {
  grid-column: span v-bind(giCol);
  width: v-bind(giWidth);
  margin-left: v-bind(marLeft);
}
</style>
