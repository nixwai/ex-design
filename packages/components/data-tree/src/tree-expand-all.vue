<template>
  <div
    class="ex-expand-all"
    :title="isExpandAll ? '收起全部' : '展开全部'"
    @click="setExpand(!isExpandAll)"
  >
    <i :class="[isExpandAll ? 'el-icon-arrow-down' : 'el-icon-arrow-right']" />
  </div>
</template>

<script>
export default {
  name: 'TreeExpandAll'
};
</script>

<script setup>
defineProps({
  isExpandAll: {
    type: Boolean,
    default: true
  },
  setExpand: {
    type: Function,
    default: () => {}
  }
});
</script>

<style scoped>
.ex-expand-all {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin: 0 5px;
  cursor: pointer;
}
</style>
