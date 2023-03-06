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
    class="ex-tree-select"
    @close="handleTooltipClose"
  >
    <template #default="{ downWidth }">
      <base-select
        ref="selectRef"
        :flat-all-options.sync="flatAllOptions"
        :collapse-tags="isCollapse"
        :value="selectVal"
        :child-key="childKey"
        :select-all="false"
        v-bind="selectAttrs"
        @remove-tag="handleRemoveTag"
        @visible-change="handleVisible"
        @filter-change="handleFilterChange"
        @clear="handleSelectClear"
        v-on="selectListeners"
      >
        <template v-for="(_slot, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
        <template #default>
          <tree-content
            ref="treeRef"
            v-model="treeValue"
            :data="flatAllOptions"
            :type="multiple ? 'checkbox' : 'radio'"
            :filter-text="filterText"
            :show-select-icon="showIcon"
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
          <el-option v-show="false" disabled value="控制树型列表可以正常显示" />
          <!-- 渲染需要回显的选择项 -->
          <render-options v-bind="{ isCollapse, selectedOptions }" />
        </template>
      </base-select>
    </template>
  </tooltip-options>
</template>

<script>
export default {
  name: 'ExTreeSelect',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { computed, nextTick, ref, useAttrs, useListeners, watch } from 'vue';
import { useSelectedOptions } from './useSelectedOptions';
import { getRefExposeFn } from '../../../utils/component';
import { treeContentProps } from '../../data-tree/src/tree-content';
import { moreSelectProps } from '../../more-select/src/more-select';
import { treeSelectProps, treeSelectEmits } from './tree-select';
import { selectProps } from '../../select/src/select';
import { useTreeOptions } from './useTreeOptions';
import TooltipOptions from '../../more-select/src/tooltip-options.vue';
import RenderOptions from '../../more-select/src/render-options.vue';
import TreeContent from '../../data-tree/src/tree-content.vue';
import BaseSelect from '../../select/src/base-select.vue';

const props = defineProps({
  ...treeContentProps,
  ...selectProps,
  ...moreSelectProps,
  ...treeSelectProps
});

const emit = defineEmits(treeSelectEmits);

const selectAttrs = computed(() => ({
  ...props,
  ...useAttrs()
}));

const selectListeners = computed(() => ({
  ...useListeners(),
  change: () => {}
}));

/** 显示图标 */
const showIcon = computed(() => {
  if (props.showSelectIcon !== undefined) {
    return props.showSelectIcon;
  }
  return props.multiple;
});

/** 树实例 */
const treeRef = ref();
/** 下拉项是否可见 */
const visible = ref(false);
/** 下拉显示与隐藏 */
function handleVisible(val) {
  visible.value = val;
  if (val) {
    treeRef.value?.refreshScroll();
  }
}

/** 拍平后的所有下拉选择项 */
const flatAllOptions = ref([]);
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

/** 清空选择 */
function handleSelectClear() {
  emit('change', []);
}
/** 输入框内关闭tag标签修改value */
function handleRemoveTag(val) {
  treeRef.value.setNodeSelectByKey(val, false);
}
/** 在提示框内关闭tag标签修改value */
function handleTooltipClose(option) {
  treeRef.value.setNodeSelectByKey(option.value, false);
  emit('remove-tag', option.value);
}

const selectRef = ref();
const { treeValue, filterText, treeCheckedOptions, handleTreeChange, handleFilterChange } =
  useTreeOptions(selectRef, treeRef, props, emit);

/** 初始化已选择项长度 */
const initLen = computed(() => {
  if (isCollapse.value) {
    return props.collapseTagsTooltip ? 100 : 1;
  }
  return props.maxTags;
});

watch(flatAllOptions, () => {
  nextTick(() => {
    const { data } = treeRef.value?.getCheckedData(props.checkStrategy);
    treeCheckedOptions.value = data ? (props.multiple ? data : [data]) : [];
  });
});

const { selectVal, selectedOptions, setSelectedOptions } = useSelectedOptions({
  treeCheckedOptions,
  initLen,
  props
});

defineExpose({
  ...getRefExposeFn(selectRef, ['focus', 'blur', 'commitRequest'])
});
</script>

<style scoped>
.ex-tree-select {
  width: 100%;
}
</style>
