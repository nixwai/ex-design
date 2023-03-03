<template>
  <div
    class="ex-expand-all"
    :title="isExpandAll ? '收起全部' : '展开全部'"
    :style="{ background: `url(${iconUrl})` }"
    @click="setExpand(!isExpandAll)"
  />
</template>

<script>
export default {
  name: 'TreeExpandAll'
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isExpandAll: {
    type: Boolean,
    default: true
  },
  setExpand: {
    type: Function,
    default: () => {}
  }
});

const unfoldIcon = require('./icons/unfold.svg');
const foldIcon = require('./icons/fold.svg');

const iconUrl = computed(() => {
  return props.isExpandAll ? unfoldIcon : foldIcon;
});
</script>

<style scoped>
.ex-expand-all {
  width: 14px;
  height: 14px;
  margin: 0 10px;
  cursor: pointer;
}
</style>
