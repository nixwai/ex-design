<template>
  <el-radio-group :value="value" v-bind="selectAttrs" class="ex-radio-group" @input="handleInput">
    <!-- 按钮样式 -->
    <template v-if="button">
      <el-radio-button
        v-for="option in options"
        :key="option[valueKey]"
        :label="option[valueKey]"
        :disabled="disabledMethod(option)"
        :class="{ 'ex-radio-full': full }"
      >
        <slot
          :name="slots.option || 'option'"
          :option="option"
          :selected="value === option[valueKey]"
        >
          {{ option[labelKey] }}
        </slot>
      </el-radio-button>
    </template>
    <!-- 普通样式 -->
    <template v-else>
      <el-radio
        v-for="option in options"
        :key="option[valueKey]"
        :label="option[valueKey]"
        :disabled="disabledMethod(option)"
        :border="border"
        :class="[border ? 'ex-radio-border' : 'ex-radio', full ? 'ex-radio-full' : '']"
      >
        <slot
          :name="slots.option || 'option'"
          :option="option"
          :selected="value === option[valueKey]"
        >
          {{ option[labelKey] }}
        </slot>
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
export default {
  name: 'ExRadioGroup',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { useAttrs } from 'vue';
import { radioProps, radioEmits } from './radio-group';

const props = defineProps(radioProps);
const emit = defineEmits(radioEmits);

const selectAttrs = useAttrs();

function handleInput(val) {
  emit('change', val);
}
</script>

<style scoped>
.ex-radio-group {
  display: flex;
  justify-content: v-bind(props.align);
  width: 100%;
}

.ex-radio-full {
  flex: 1;
}

.ex-radio:not(:last-child) {
  margin-right: 10px;
}

.ex-radio-border {
  margin-right: 0;
}

.ex-radio-group >>> .el-radio-button__inner {
  width: 100%;
}
</style>
