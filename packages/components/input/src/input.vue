<template>
  <el-input
    ref="inputRef"
    v-model="inputValue"
    v-bind="inputAttrs"
    class="ex-input"
    v-on="inputListeners"
  >
    <template #prepend>
      <template v-if="prependText">{{ prependText }}</template>
    </template>
    <template #append>
      <template v-if="appendText">{{ appendText }}</template>
    </template>
    <template v-for="(_slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" :slot-name="slotName" />
    </template>
    <template v-for="(alias, name) in slots" #[name]>
      <slot :name="alias" :slot-name="name" />
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'ExInput',
  inheritAttrs: false
};
</script>

<script setup>
import { computed, ref, useAttrs, useListeners, watch } from 'vue';
import { inputProps } from './input';
import { getRefExposeFn } from '../../../utils/component';

const props = defineProps(inputProps);

const inputAttrs = computed(() => ({
  placeholder: '请输入' + props.label,
  ...useAttrs()
}));
const inputListeners = useListeners();

const inputValue = ref(props.value);

watch(
  () => props.value,
  (val) => {
    inputValue.value = val;
  }
);

const inputRef = ref();

defineExpose({
  ...getRefExposeFn(inputRef, ['focus', 'blur', 'select'])
});
</script>

<style scoped>
.ex-input {
  width: 100%;
  text-align: v-bind(props.align);
}

.ex-input >>> input {
  text-align: inherit;
}
</style>
