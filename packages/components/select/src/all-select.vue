<template>
  <div style="height: 30px">
    <div class="ex-select-box">
      <div class="ex-all-select">
        <span class="ex-select-text" @click="handleClick">全选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllSelect'
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  valueKey: {
    type: String,
    default: 'value'
  },
  groupKey: {
    type: String,
    default: undefined
  },
  downOptions: {
    type: Array,
    default: () => []
  },
  disabledMethod: {
    type: Function,
    default: () => false
  },
  hideMethod: {
    type: Function,
    default: () => false
  }
});

const emit = defineEmits(['select-all']);

/** 选项所有可选值 */
const optionsVal = computed(() => {
  const { downOptions, disabledMethod, groupKey, hideMethod, valueKey } = props;
  return downOptions
    .filter((option) => !disabledMethod(option) && !hideMethod(option) && !option[groupKey])
    .map((option) => option[valueKey]);
});

function handleClick() {
  emit('select-all', optionsVal.value);
}
</script>

<style scoped>
.ex-select-box {
  position: absolute;
  top: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  background-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.ex-all-select {
  padding: 8px 10px;
  margin-bottom: 1px;
  box-shadow: rgb(221 221 221 / 50%) 0 1px 1px;
}

.ex-select-text {
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}

.ex-select-text:hover {
  color: #409eff;
}
</style>
