<template>
  <vxe-list ref="listRef" v-bind="listAttrs" class="ex-virtual-list" v-on="listListeners">
    <template #default="slotData">
      <slot v-bind="slotData" />
    </template>
  </vxe-list>
</template>

<script>
export default {
  name: 'ExVirtualList',
  inheritAttrs: false
};
</script>

<script setup>
import { ref, useAttrs, useListeners } from 'vue';
import { getRefExposeFn } from '../../../utils/component';

const props = defineProps({
  /** 最大高度 */
  maxHeight: {
    type: String,
    default: '100%'
  },
  /** 决定每行的高度，可优化滚动的流程性 */
  rowHeight: {
    type: Number,
    default: undefined
  }
});

const listAttrs = useAttrs();
const listListeners = useListeners();

const listRef = ref();

if (props.rowHeight) {
  setTimeout(() => {
    listRef.value.scrollYStore.rowHeight = props.rowHeight;
  });
}

defineExpose({
  ...getRefExposeFn(listRef, [
    'loadData',
    'recalculate',
    'scrollTo',
    'refreshScroll',
    'clearScroll'
  ])
});
</script>

<style scoped>
.ex-virtual-list {
  z-index: 2;
  width: 100%;
}

.ex-virtual-list >>> .vxe-list--virtual-wrapper {
  height: 100%;
  max-height: v-bind(props.maxHeight);
}

.ex-virtual-list >>> ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.ex-virtual-list >>> ::-webkit-scrollbar-thumb {
  border-radius: 4px;
}

.ex-virtual-list:hover >>> ::-webkit-scrollbar-thumb {
  background-color: rgb(144 147 153 / 30%);
}

.ex-virtual-list >>> ::-webkit-scrollbar-thumb:hover {
  background-color: rgb(144 147 153 / 50%);
}
</style>
