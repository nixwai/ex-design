<template>
  <el-checkbox-group
    v-model="checkboxValue"
    v-bind="checkboxAttrs"
    class="ex-checkbox-group"
    v-on="checkboxListener"
  >
    <!-- 按钮样式 -->
    <template v-if="button">
      <el-checkbox-button
        v-for="option in options"
        :key="option[valueKey]"
        :label="option[valueKey]"
        :disabled="disabledMethod(option)"
        :class="{ 'ex-checkbox-full': full }"
      >
        <slot
          :name="slots.option || 'option'"
          :option="option"
          :selected="checkboxValue.includes(option[valueKey])"
        >
          {{ option[labelKey] }}
        </slot>
      </el-checkbox-button>
    </template>
    <!-- 普通样式 -->
    <template v-else>
      <el-checkbox
        v-for="option in options"
        :key="option[valueKey]"
        :label="option[valueKey]"
        :disabled="disabledMethod(option)"
        :border="border"
        :class="[border ? 'ex-checkbox-border' : 'ex-checkbox', full ? 'ex-checkbox-full' : '']"
      >
        <slot
          :name="slots.option || 'option'"
          :option="option"
          :selected="checkboxValue.includes(option[valueKey])"
        >
          {{ option[labelKey] }}
        </slot>
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'ExCheckboxGroup',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { ref, useAttrs, useListeners, watch } from 'vue';
import { checkboxProps, checkboxEmits } from './checkbox-group';

const props = defineProps(checkboxProps);
defineEmits(checkboxEmits);

const checkboxAttrs = useAttrs();
const checkboxListener = useListeners();

const checkboxValue = ref([]);
watch(
  () => props.value,
  (val) => {
    checkboxValue.value = val || [];
  },
  { immediate: true }
);
</script>

<style scoped>
.ex-checkbox-group {
  display: flex;
  justify-content: v-bind(props.align);
  width: 100%;
}

.ex-checkbox-full {
  flex: 1;
}

.ex-checkbox:not(:last-child) {
  margin-right: 10px;
}

.ex-checkbox-border:not(:last-child) {
  margin-right: 0;
}

.ex-checkbox-group >>> .el-checkbox-button__inner {
  width: 100%;
}
</style>
