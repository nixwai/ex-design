<template>
  <!-- 折叠时鼠标悬浮提示已选择项 -->
  <tooltip-options
    :value="value"
    :visible="visible"
    :is-tooltip="isTooltip"
    :selected-options="selectedOptions"
    :set-selected-options="setSelectedOptions"
    :disabled="selectAttrs.disabled"
    :option-width="optionWidth"
    class="ex-more-select"
    @close="handleTooltipClose"
  >
    <template #default="{ downWidth }">
      <base-select
        ref="selectRef"
        :down-options.sync="downOptions"
        :flat-all-options.sync="flatAllOptions"
        :collapse-tags="isCollapse"
        :value="selectVal"
        :child-key="undefined"
        v-bind="selectAttrs"
        @remove-tag="handleRemoveTag"
        @visible-change="handleVisible"
        @change="handleSelectChange"
        v-on="selectListeners"
      >
        <template v-for="(_slot, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
        <template #default>
          <ex-virtual-list
            ref="virtualListRef"
            :data="downOptions"
            :scroll-y="{ gt, oSize: -1 }"
            :row-height="34"
            max-height="200px"
            :style="{ width: downWidth }"
          >
            <template #default="{ items }">
              <base-options
                :value="value"
                :options="items"
                :value-key="valueKey"
                :label-key="labelKey"
                :group-key="groupKey"
                :disabled-method="disabledMethod"
                :hide-method="hideMethod"
              >
                <template #default="{ option }">
                  <slot :name="slots.option || 'option'" :option="option">
                    <ex-overflow-tip
                      v-if="optionWidth !== 'auto'"
                      :text="option[labelKey]"
                      :enterable="false"
                      :open-delay="500"
                    />
                  </slot>
                </template>
              </base-options>
            </template>
          </ex-virtual-list>
          <!-- 用于启用虚拟滚动时，渲染需要回显的选择项 -->
          <render-options
            v-if="isVirtual && downOptions.length"
            v-bind="{ isCollapse, selectedOptions }"
          />
        </template>
      </base-select>
    </template>
  </tooltip-options>
</template>

<script>
export default {
  name: 'ExMoreSelect',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { moreSelectEmits, moreSelectProps } from './more-select';
import { computed, ref, useAttrs, useListeners } from 'vue';
import { useSelectedOptions } from './useSelectedOptions';
import { getRefExposeFn } from '../../../utils/component';
import { selectProps } from '../../select/src/select';
import BaseSelect from '../../select/src/base-select.vue';
import BaseOptions from '../../select/src/base-options.vue';
import TooltipOptions from './tooltip-options.vue';
import RenderOptions from './render-options.vue';
import ExVirtualList from '../../virtual-list';
import ExOverflowTip from '../../overflow-tip';

const props = defineProps({
  ...selectProps,
  ...moreSelectProps
});

const emit = defineEmits(moreSelectEmits);

const selectAttrs = computed(() => ({
  ...props,
  ...useAttrs()
}));

const selectListeners = computed(() => ({
  ...useListeners(),
  change: () => {}
}));

/** 虚拟滚动列表实例 */
const virtualListRef = ref();
/** 下拉项是否可见 */
const visible = ref(false);
/** 下拉显示与隐藏 */
function handleVisible(val) {
  visible.value = val;
  if (val) {
    virtualListRef.value?.refreshScroll();
  }
}

/** 拍平后的所有下拉选择项 */
const flatAllOptions = ref([]);
/** 下拉显示的选择项 */
const downOptions = ref([]);
/** 是否折叠tag */
const isCollapse = computed(() => {
  if (!props.multiple || !Array.isArray(props.value) || props.value.length <= 1) {
    return false;
  }
  if (props.value.length > props.maxTags) {
    return true;
  }
  return props.collapseTags !== false;
});
/** 是否显示选项提示 */
const isTooltip = computed(() => {
  return isCollapse.value && props.collapseTagsTooltip !== false;
});
/** 是否启用虚拟滚动 */
const isVirtual = computed(() => {
  return flatAllOptions.value.length >= props.gt;
});
/** 初始化已选择项长度 */
const initLen = computed(() => {
  if (!isVirtual.value && !isTooltip.value) {
    return 0;
  }
  if (isCollapse.value) {
    return isTooltip.value ? 100 : 1;
  }
  return props.maxTags;
});

const { selectVal, selectedOptions, isAutomatic, removeSelected, setSelectedOptions } =
  useSelectedOptions({ flatAllOptions, initLen, props });

/** 选择项修改 */
function handleSelectChange(val) {
  if (!isCollapse.value) {
    isAutomatic.value = false;
  }
  emit('change', val);
}

/** 输入框内关闭tag标签修改value */
function handleRemoveTag() {
  if (isTooltip.value) {
    removeSelected(0);
  }
}
/** 在提示框内关闭tag标签修改value */
function handleTooltipClose(option, index) {
  removeSelected(index);
  const newVal = [...props.value];
  newVal.splice(index, 1);
  emit('change', newVal);
  emit('remove-tag', option.value);
}

const selectRef = ref();

defineExpose({
  ...getRefExposeFn(selectRef, ['focus', 'blur', 'commitRequest'])
});
</script>

<style scoped>
.ex-more-select {
  width: 100%;
}
</style>
