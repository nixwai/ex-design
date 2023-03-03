<template>
  <base-select
    ref="selectRef"
    :down-options.sync="downOptions"
    :flat-all-options.sync="flatAllOptions"
    v-bind="selectAttrs"
    v-on="selectListeners"
  >
    <template v-for="(_slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <template #default>
      <slot :name="slots.default || 'default'">
        <base-options
          :value="selectVal"
          :options="beforeOptions"
          :value-key="valueKey"
          :label-key="labelKey"
          :group-key="groupKey"
          :disabled-method="disabledMethod"
          :hide-method="hideMethod"
        >
          <template #default="slotData">
            <slot :name="slots.option || 'option'" v-bind="slotData" />
          </template>
        </base-options>
        <render-options :selected-options="selectedOptions" />
      </slot>
    </template>
  </base-select>
</template>

<script>
export default {
  name: 'ExSelect',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { computed, ref, useAttrs, useListeners } from 'vue';
import { getRefExposeFn } from '../../../utils/component';
import { selectEmits, selectProps } from './select';
import BaseOptions from './base-options.vue';
import BaseSelect from './base-select.vue';
import RenderOptions from '../../more-select/src/render-options.vue';
import { useSelectedOptions } from '../../more-select/src/useSelectedOptions';

const props = defineProps({
  ...selectProps,
  /** 最多渲染的下拉选择数 */
  renderCount: {
    type: Number,
    default: 200
  }
});
defineEmits(selectEmits);

const selectAttrs = computed(() => ({
  ...props,
  ...useAttrs()
}));
const selectListeners = useListeners();

/** 下拉显示的选择项 */
const downOptions = ref([]);

/** 只取前renderCount个选项，以支持大数据搜索 */
const beforeOptions = computed(() => {
  return downOptions.value.slice(0, selectAttrs.value.renderCount);
});

/** 所有下拉选择项 */
const flatAllOptions = ref([]);
/** 初始化已选择项长度 */
const initLen = computed(() => {
  if (flatAllOptions.value.length <= props.renderCount) {
    return 0;
  }
  if (!props.multiple || props.collapseTags) {
    return 1;
  }
  return props.value?.length || 0;
});
const { selectVal, selectedOptions } = useSelectedOptions({
  flatAllOptions,
  initLen,
  props
});

/** 下拉实例 */
const selectRef = ref();

defineExpose({
  ...getRefExposeFn(selectRef, ['focus', 'blur', 'commitRequest'])
});
</script>
