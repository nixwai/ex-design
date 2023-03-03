<template>
  <vxe-button
    circle
    :title="isExpandAll ? '收起全部' : '展开全部'"
    @click="isExpandAll = !isExpandAll"
  >
    <i :class="isExpandAll ? 'vxe-icon-caret-down' : 'vxe-icon-caret-right'" />
  </vxe-button>
</template>

<script>
export default {
  name: 'ExpandAllToggle'
};
</script>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  treeConfig: {
    type: Object,
    default: undefined
  },
  data: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['expand-all-change']);

/** 是否默认展开全部 */
let defaultExpand = !!props.treeConfig?.expandAll;
/** 是否展开全部 */
const isExpandAll = ref(false);
/** 数据变更时重置 */
watch(
  () => props.data,
  () => {
    if (defaultExpand && props.data?.length > 0) {
      isExpandAll.value = true;
      // 默认值仅触发一次
      defaultExpand = false;
      return;
    }
    isExpandAll.value = false;
  },
  { immediate: true }
);

watch(isExpandAll, (currentVal, prevVal) => {
  if (currentVal !== prevVal) {
    emit('expand-all-change', currentVal);
  }
});
</script>
