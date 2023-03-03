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
        :child-key="childKey || groupKey"
        :select-all="selectAll && !childKey"
        v-bind="selectAttrs"
        @remove-tag="handleRemoveTag"
        @visible-change="handleVisible"
        @filter-change="handleFilterChange"
        @change="handleSelectChange"
        @clear="handleSelectClear"
        v-on="selectListeners"
      >
        <template v-for="(_slot, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
        <template #default>
          <!-- 树型列表 -->
          <template v-if="childKey">
            <tree-content
              ref="virtualListRef"
              v-model="treeValue"
              :data="flatAllOptions"
              :type="multiple ? 'checkbox' : 'radio'"
              :filter-text="filterText"
              :show-select-icon="multiple"
              v-bind="props"
              :style="{ width: downWidth, height: '200px' }"
              @change="handleTreeChange"
            >
              <template v-for="(_slot, slotName) in $slots" #[slotName]>
                <slot :name="slotName" />
              </template>
              <template v-for="(alias, name) in slots" #[name]>
                <slot :name="alias" :slot-name="name" />
              </template>
              <template #default="{ node }">
                <slot :name="slots.option || 'option'" :option="node" />
              </template>
            </tree-content>
            <el-option
              v-show="false"
              v-if="flatAllOptions.length"
              value="控制树型列表可以正常显示"
            />
          </template>
          <!-- 普通列表 -->
          <template v-else>
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
          </template>
          <!-- 用于启用虚拟滚动时，渲染需要回显的选择项 -->
          <render-options
            v-if="isVirtual && downOptions.length"
            v-bind="{ isCollapse, selectedOptions, maxTags }"
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
import { useTreeOptions } from './useTreeOptions';
import { getRefExposeFn } from '../../../utils/component';
import { selectProps } from '../../select/src/select';
import { treeContentProps } from '../../data-tree/src/tree-content';
import TreeContent from '../../data-tree/src/tree-content.vue';
import BaseSelect from '../../select/src/base-select.vue';
import BaseOptions from '../../select/src/base-options.vue';
import TooltipOptions from './tooltip-options.vue';
import RenderOptions from './render-options.vue';
import ExVirtualList from '../../virtual-list';
import ExOverflowTip from '../../overflow-tip';

const props = defineProps({
  ...treeContentProps,
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
  // 树型下，选择由树触发
  if (props.childKey) {
    return;
  }
  if (!isCollapse.value) {
    isAutomatic.value = false;
  }
  emit('change', val);
}
/** 清空选择 */
function handleSelectClear() {
  if (props.childKey) {
    emit('change', []);
  }
}
/** 输入框内关闭tag标签修改value */
function handleRemoveTag(val) {
  if (props.childKey) {
    virtualListRef.value.setNodeSelectByKey(val, false);
    return;
  }
  if (isTooltip.value) {
    removeSelected(0);
  }
}
/** 在提示框内关闭tag标签修改value */
function handleTooltipClose(option, index) {
  // 为树型结构时，需要手动修改选择，起到联动的效果
  if (props.childKey) {
    virtualListRef.value.setNodeSelectByKey(option.value, false);
  } else {
    removeSelected(index);
    const newVal = [...props.value];
    newVal.splice(index, 1);
    emit('change', newVal);
  }
  emit('remove-tag', option.value);
}

const selectRef = ref();
const { treeValue, filterText, handleTreeChange, handleFilterChange } = useTreeOptions(
  selectRef,
  virtualListRef,
  props,
  emit
);

defineExpose({
  ...getRefExposeFn(selectRef, ['focus', 'blur', 'commitRequest'])
});
</script>

<style scoped>
.ex-more-select {
  width: 100%;
}
</style>
