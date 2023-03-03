<template>
  <ex-resize-content v-bind="props">
    <div class="ex-data-tree">
      <div v-if="filterable" class="ex-tree-filter">
        <el-input
          ref="filterInputRef"
          v-model="filterText"
          :placeholder="filterTip"
          size="small"
          clearable
          prefix-icon="el-icon-search"
          :disabled="treeLoading"
          style="flex: 1"
          @input="handleSearchInput"
        />
        <tree-expand-all
          v-if="expandAll"
          :is-expand-all="isExpandAll"
          :set-expand="setAllTreeExpand"
        />
      </div>
      <slot name="header" />
      <div
        v-loading="treeLoading || filterLoading"
        element-loading-spinner="el-icon-loading"
        style="flex: 1; overflow: hidden"
      >
        <tree-content
          ref="treeContentRef"
          v-model="selectValue"
          v-bind="props"
          :data="flatData"
          :filter-text="filterText"
          :expand-all="!filterable && expandAll"
          @change="handleChange"
          @expand-all-change="(val) => (isExpandAll = val)"
          @expand-node-change="handleExpandNode"
        >
          <template #default="slotData">
            <slot v-bind="slotData" />
          </template>
          <template #title>
            <slot name="title" />
          </template>
          <template #empty>
            <slot name="empty" />
          </template>
        </tree-content>
      </div>
    </div>
  </ex-resize-content>
</template>

<script>
export default {
  name: 'ExDataTree',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { ref, watch } from 'vue';
import { treeContentProps } from './tree-content';
import { dataTreeProps, dataTreeEmits } from './data-tree';
import { resizeContentProps } from '../../resize-content/src/resize-content';
import { useRequestConfig } from '../../../hooks/useRequestConfig';
import { toTreeArray, filterTreeArray } from '../../../utils/tree';
import { getRefExposeFn } from '../../../utils/component';
import ExResizeContent from '../../resize-content';
import TreeExpandAll from './tree-expand-all.vue';
import TreeContent from './tree-content.vue';

const props = defineProps({
  ...resizeContentProps,
  ...treeContentProps,
  ...dataTreeProps
});
const emit = defineEmits(dataTreeEmits);

const {
  data: treeData,
  loading: treeLoading,
  commitRequest
} = useRequestConfig({
  dataKey: 'data',
  props,
  emit
});

const isExpandAll = ref(false);
const treeContentRef = ref();
/** 设置展开 */
function setAllTreeExpand(val) {
  treeContentRef.value?.setAllTreeExpand?.(val);
}

const flatData = ref([]);
const filterText = ref('');

watch(
  treeData,
  (data) => {
    filterText.value = '';
    flatData.value = toTreeArray(data, props.childKey, true, props.deep);
    setDataFilterStatus();
  },
  { immediate: true }
);

/** 搜索加载 */
const filterLoading = ref(false);

/** 搜索输入 */
function handleSearchInput() {
  filterLoading.value = true;
  setTimeout(() => {
    setDataFilterStatus();
    !filterText.value
      ? setAllTreeExpand(props.defaultExpandAll)
      : treeContentRef.value?.refreshFilterExpand?.();
    treeContentRef.value?.refreshTreeSelect?.(false);
    filterLoading.value = false;
  });
}

/** 默认筛选方法 */
function defaultFilterMethod(node) {
  // 没有filterKeys默认筛选labelKey
  if (!props.filterKeys.length) {
    return node[props.labelKey].toString().includes(filterText.value);
  }
  for (let i = 0; i < props.filterKeys.length; i++) {
    const key = props.filterKeys[i];
    const res = node[key].toString().includes(filterText.value);
    if (res) {
      return true;
    }
  }
}

/** 搜索方法 */
const searchMethod =
  typeof props.filterMethod === 'function' ? props.filterMethod : defaultFilterMethod;

/** 设置树的筛选状态 */
function setDataFilterStatus() {
  if (filterText.value) {
    filterTreeArray(flatData.value, props.childKey, searchMethod);
  } else {
    flatData.value.forEach((item) => {
      item._FILTER = false;
      item._FILTER_RELATE = true;
      item._IS_CHILD_FILTER = false;
      return item;
    });
  }
}

const selectValue = ref();
let tempValue;

watch(
  () => props.value,
  (val) => {
    // 判断绑定值与当前的选择值是否一致，不一致时更新树的选择值
    if (JSON.stringify(val) === JSON.stringify(tempValue)) {
      return;
    }
    tempValue = val;
    selectValue.value = val;
  },
  { immediate: true }
);

/** 触发选择 */
function handleChange() {
  const { value, data } = treeContentRef.value?.getCheckedData(props.checkStrategy);
  tempValue = value;
  emit('change', value, data);
}

function handleExpandNode(...params) {
  emit('expand-node-change', ...params);
}

const filterInputRef = ref();

defineExpose({
  commitRequest,
  ...getRefExposeFn(filterInputRef, ['focus', 'blur', 'select']),
  ...getRefExposeFn(treeContentRef, [
    'setAllTreeSelect',
    'setAllTreeExpand',
    'getCheckedData',
    'setNodeSelectByKey'
  ])
});
</script>

<style scoped lang="scss">
.ex-data-tree {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: white;

  .ex-tree-filter {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    padding-left: 10px;
    margin: 10px 0;
    box-shadow: rgb(221 221 221 / 40%) 0 1px 2px;
  }
}
</style>
