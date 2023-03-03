<template>
  <el-input
    ref="inputRef"
    v-model="inputVal"
    v-bind="inputAttrs"
    class="ex-edit-number"
    :style="{ 'text-align': align }"
    @keydown.up.native.prevent="handlePlusStep(1)"
    @keydown.down.native.prevent="handlePlusStep(-1)"
    @change="handleChange"
    @focus="isFocus = true"
    @blur="isFocus = false"
    v-on="inputListeners"
  >
    <template #prepend>
      <template v-if="prependText">{{ prependText }}</template>
    </template>
    <template #append>
      <template v-if="appendText">{{ appendText }}</template>
    </template>
    <template v-for="(_slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <template v-for="(alias, name) in slots" #[name]>
      <slot :name="alias" :slot-name="name" />
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'ExEditNumber',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { watch, computed, nextTick, ref, useAttrs, useListeners } from 'vue';
import { editNumberProps, editNumberEmits } from './edit-number';
import { formatRound, formatAmount, formatStep } from '../../../utils/format';
import { getRefExposeFn } from '../../../utils/component';

const props = defineProps(editNumberProps);
const emit = defineEmits(editNumberEmits);

const inputAttrs = computed(() => ({
  placeholder: '请输入' + props.label,
  ...useAttrs()
}));

const inputListeners = computed(() => ({
  ...useListeners(),
  change: () => {}
}));

const inputRef = ref();
const isFocus = ref(false);
watch(isFocus, (val) => {
  if (val) {
    nextTick(() => {
      // 获取焦点时，选中输入内容
      inputRef.value.select();
    });
  }
});

const numberVal = computed({
  get: () => {
    let val = '';
    if (!props.thousands || isFocus.value) {
      val = formatRound(props.value, props.precision);
    } else {
      val = formatAmount(props.value, props.precision);
    }
    return val;
  },
  set: (val) => {
    if (val !== numberVal.value) {
      emit('change', val, props.value);
    }
  }
});

const inputVal = ref('');
watch(
  numberVal,
  () => {
    inputVal.value = numberVal.value;
  },
  { immediate: true }
);

/** 输入框失去焦点或用户按下回车时变更绑定值*/
function handleChange(newVal) {
  // 一切空值置为null
  if ([null, '', undefined].includes(newVal)) {
    numberVal.value = null;
    return;
  }
  // 非数字类型时重置原值
  if (isNaN(newVal)) {
    inputVal.value = numberVal.value;
    return;
  }
  newVal = formatRound(newVal, props.precision);
  newVal = formatStep(newVal, props.step);
  if (newVal >= props.max) {
    newVal = props.max;
  }
  if (newVal <= props.min) {
    newVal = props.min;
  }
  numberVal.value = newVal;
}

/** 叠加固定值 */
function handlePlusStep(pn) {
  if (!props.step) {
    return;
  }
  const newVal = Number(numberVal.value || 0) + props.step * pn;
  handleChange(newVal);
}

defineExpose({
  ...getRefExposeFn(inputRef, ['focus', 'blur', 'select'])
});
</script>

<style scoped>
.ex-edit-number {
  width: 100%;
}

.ex-edit-number >>> input {
  text-align: inherit;
}
</style>
