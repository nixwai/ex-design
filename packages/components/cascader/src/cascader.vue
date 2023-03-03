<template>
  <el-cascader
    ref="cascaderRef"
    v-loading="cascaderLoading"
    element-loading-spinner="el-icon-loading"
    :options="cascaderOptions"
    v-bind="cascaderAttrs"
    class="ex-cascader"
    v-on="cascaderListeners"
  >
    <template v-for="(_slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <template v-for="(_slot, slotName) in $scopedSlots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData" />
    </template>
    <template v-for="(alias, name) in slots" #[name]="slotData">
      <slot :name="alias" :slot-name="name" v-bind="slotData" />
    </template>
  </el-cascader>
</template>

<script>
export default {
  name: 'ExCascader',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { computed, ref, useAttrs, useListeners } from 'vue';
import { cascaderProps, cascaderEmits } from './cascader';
import { useRequestConfig } from '../../../hooks/useRequestConfig';
import { getRefExposeFn } from '../../../utils/component';

const props = defineProps(cascaderProps);
const emit = defineEmits(cascaderEmits);

const cascaderAttrs = computed(() => ({
  placeholder: '请选择' + props.label,
  ...useAttrs()
}));
const cascaderListeners = useListeners();

const {
  data: cascaderOptions,
  loading: cascaderLoading,
  commitRequest
} = useRequestConfig({ dataKey: 'options', props, emit });

const cascaderRef = ref();

defineExpose({
  ...getRefExposeFn(cascaderRef, ['getCheckedNodes']),
  commitRequest
});
</script>

<style scoped>
.ex-cascader {
  justify-content: v-bind(props.align);
  width: 100%;
  text-align: v-bind(props.align);
}

.ex-cascader >>> input {
  text-align: inherit;
}

.ex-cascader >>> .el-cascader__tags {
  /* 调整选择项为tags时位置跟随align属性 */
  display: flex;
  justify-content: inherit;
}
</style>
