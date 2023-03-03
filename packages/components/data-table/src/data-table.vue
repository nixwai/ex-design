<template>
  <vxe-grid
    ref="vxeGridRef"
    :data="tableData && sourceData"
    :columns="columns"
    :loading="tableLoading"
    :footer-method="tableFooterMethod"
    :show-footer="tableShowFooter"
    :tree-config="tableTreeConfig"
    v-bind="tableAttrs"
    class="ex-data-table"
    @checkbox-change="(data) => emit('select', data)"
    @checkbox-all="(data) => emit('select', data)"
    v-on="tableListeners"
  >
    <template v-for="(_slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <template v-for="(_slot, slotName) in $scopedSlots" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData" />
    </template>
    <!-- 表头按钮栏 -->
    <template #[tableAttrs.toolbarConfig.slots.buttons]="slotData">
      <slot :name="tableAttrs.toolbarConfig.slots.buttons" v-bind="slotData" />
    </template>
    <!-- 表头工具栏 -->
    <template #[tableAttrs.toolbarConfig.slots.tools]="slotData">
      <slot :name="tableAttrs.toolbarConfig.slots.tools" v-bind="slotData" />
      <div style="margin-right: 10px">
        <!-- 金额单位切换 -->
        <money-unit-toggle
          v-if="toolbarConfig.moneyUnit"
          :is-yuan-unit.sync="isYuanUnit"
          :columns="columns"
          @unit-change="emit('unit-change', isYuanUnit)"
        />
        <!-- 展开切换 -->
        <expand-all-toggle
          v-if="toolbarConfig.expandAll"
          :data="data"
          :tree-config="treeConfig"
          @expand-all-change="handleChangeExpand"
        />
      </div>
    </template>
  </vxe-grid>
</template>

<script>
export default {
  name: 'ExDataTable',
  inheritAttrs: false
};
</script>

<script setup>
import { computed, ref, useAttrs, useListeners, watch } from 'vue';
import { tableProps, tabletEmits } from './data-table';
import { useColumns } from './useColumns';
import { useTotal } from './useTotal';
import { useFormatter } from './useFormatter';
import { useRequestConfig } from '../../../hooks/useRequestConfig';
import { toTreeArray } from '../../../utils/tree';
import MoneyUnitToggle from './money-unit-toggle.vue';
import ExpandAllToggle from './expand-all-toggle.vue';

const props = defineProps(tableProps);
const emit = defineEmits(tabletEmits);

const {
  data: tableData,
  loading: tableLoading,
  commitRequest
} = useRequestConfig({
  dataKey: 'data',
  props,
  emit
});

/** 子级节点字段 */
const childKey = props.treeConfig ? props.treeConfig?.children ?? 'children' : '';
/** 树结构转列表结构的数据 */
const sourceData = computed(() => {
  if (!childKey) {
    return tableData.value;
  }
  return toTreeArray(tableData.value, childKey, true);
});

/** 传入的属性 */
const attrs = useAttrs();
/** 是否启用虚拟滚动 */
const isVirtual = computed(() => {
  return (attrs['scroll-y']?.gt ?? 100) < sourceData.value.length;
});
const tableAttrs = computed(() => ({
  'show-overflow': isVirtual.value,
  height: 'auto',
  ...attrs,
  toolbarConfig: {
    ...props.toolbarConfig,
    slots: {
      buttons: 'tableHeader',
      tools: 'tableTool',
      ...props.toolbarConfig?.slots
    }
  }
}));
const tableTreeConfig = computed(() => {
  if (!props.treeConfig) {
    return undefined;
  }
  return {
    rowField: '_KEY',
    parentField: '_PARENT',
    ...props.treeConfig,
    // 保持虚拟滚动
    transform: true,
    // 避免与props.treeConfig.children相同导致死循环
    children: childKey !== '_CHILD' ? '_CHILD' : '_'
  };
});

const tableListeners = useListeners();

/** 表格DOM实例 */
const vxeGridRef = ref();
/** 是否为'元'单位 */
const isYuanUnit = ref(true);

watch(isYuanUnit, () => {
  // 切换单位时重置列
  vxeGridRef.value.loadColumn(props.columns);
});

useColumns(props);

const { formatCellValue } = useFormatter(props, isYuanUnit);

const { tableShowFooter, tableFooterMethod } = useTotal({
  props,
  sourceData,
  formatCellValue
});

/** 触发展开/收起 */
function handleChangeExpand(isExpandAll) {
  emit('expand-all-change', isExpandAll);
  vxeGridRef.value.setAllTreeExpand(isExpandAll);
  vxeGridRef.value.scrollTo(0, 0);
}

function getDom() {
  return vxeGridRef.value;
}

defineExpose({
  getDom,
  formatCellValue,
  commitRequest
});
</script>

<style scoped>
.ex-data-table >>> ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #e6eaee;
}

.ex-data-table >>> ::-webkit-scrollbar-thumb {
  background-color: rgb(160 160 160 / 50%);
  border-radius: 5px;
}

.ex-data-table >>> ::-webkit-scrollbar-thumb:hover {
  background-color: rgb(160 160 160 / 70%);
}

.ex-data-table >>> ::-webkit-scrollbar-track {
  background-color: #fefefe;
  border: solid 1px rgb(202 202 202 / 30%);
  border-radius: 5px;
}
</style>
