<template>
  <div class="ex-tree-content">
    <!-- 树的头部 -->
    <div v-if="showHeader" class="ex-tree-header">
      <div class="ex-header-node" @click="handleSelectAll" @dblclick="handleDblclickSelectAll">
        <el-checkbox
          v-if="selectAll && type === 'checkbox'"
          :value="allSelectStatus === 'all'"
          :indeterminate="allSelectStatus === 'half'"
          class="node-icon"
        />
        <div
          class="node-text"
          :class="{
            'node-highlight': highlightCurrent && allSelectStatus === 'all'
          }"
        >
          <slot name="title">
            <ex-overflow-tip :text="headerTitle" style="font-weight: bold" />
          </slot>
        </div>
      </div>
      <tree-expand-all
        v-if="expandAll"
        :is-expand-all="isExpandAll"
        :set-expand="setAllTreeExpand"
      />
    </div>
    <!-- 树的主体列 -->
    <div class="ex-tree-body">
      <ex-virtual-list
        v-show="expandData.length"
        ref="listRef"
        :data="expandData"
        :scroll-y="{ gt, oSize: 1 }"
        style="height: 100%"
      >
        <template #default="{ items }">
          <div v-for="(item, index) in items" :key="index" class="ex-tree-node">
            <!-- 展开图标 -->
            <div
              :style="{
                width: (item._LEVEL - 1) * indent + 26 + 'px',
                textAlign: 'right'
              }"
              @click="toggleTreeExpand(item)"
            >
              <i
                v-if="!item._LEAF"
                class="expand-icon el-icon-caret-right"
                :class="{ 'expand-rotate': item._EXPAND }"
              />
            </div>
            <!-- 节点内容 -->
            <div class="node-content">
              <template v-if="showSelectIcon && ['checkbox', 'radio'].includes(type)">
                <div style="height: 100%" @dblclick="handleDblclickNode(item)">
                  <el-checkbox
                    v-if="type === 'checkbox'"
                    :value="item._SELECT"
                    :indeterminate="item._HALF"
                    :disabled="disabledMethod(item)"
                    class="node-icon"
                    @click.native.stop="selectTreeNode(item)"
                  />
                  <el-radio
                    v-if="type === 'radio'"
                    :value="item._SELECT"
                    :label="true"
                    :disabled="disabledMethod(item)"
                    class="node-icon"
                    @click.native.stop="({ pointerId }) => pointerId === 1 && selectTreeNode(item)"
                  >
                    {{ '' }}
                  </el-radio>
                </div>
              </template>
              <div
                class="node-text"
                :class="{
                  'node-highlight': highlightCurrent && item._SELECT,
                  'node-border-bottom': item._FILTER
                }"
                :style="{
                  cursor: checkOnClickNode && disabledMethod(item) ? 'not-allowed' : 'pointer'
                }"
                @click="handleClickNode(item)"
                @dblclick="() => checkOnClickNode && handleDblclickNode(item)"
              >
                <template v-if="highlightFilter">
                  <ex-overflow-tip
                    :text="joinFilterText(item)"
                    is-html
                    :enterable="false"
                    :open-delay="500"
                  >
                    <template #content>
                      {{ joinFilterText(item)?.replace(/(<([^>]+)>)/gi, '') }}
                    </template>
                  </ex-overflow-tip>
                </template>
                <template v-else>
                  <slot
                    :node="item"
                    :selected="item._SELECT"
                    :filter-text="props.filterText"
                    :all-data="data"
                  >
                    <ex-overflow-tip :text="item[labelKey]" :enterable="false" :open-delay="500" />
                  </slot>
                </template>
              </div>
            </div>
          </div>
        </template>
      </ex-virtual-list>
      <span v-show="!expandData.length" style="color: #999">
        <slot name="empty">暂无数据</slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeContent',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  }
};
</script>

<script setup>
import { treeContentProps, treeContentTreeEmits } from './tree-content';
import { getRefExposeFn } from '../../../utils/component';
import TreeExpandAll from './tree-expand-all.vue';
import ExVirtualList from '../../virtual-list';
import ExOverflowTip from '../../overflow-tip';
import { useTreeExpand } from './useTreeExpand';
import { useTreeSelect } from './useTreeSelect';
import { useTreeFilter } from './useTreeFilter';
import { onActivated, ref } from 'vue';

const props = defineProps({
  ...treeContentProps,
  filterText: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(treeContentTreeEmits);

const { joinFilterText } = useTreeFilter(props);

const listRef = ref();

const { expandData, isExpandAll, setAllTreeExpand, toggleTreeExpand, refreshFilterExpand } =
  useTreeExpand(props, emit, listRef);

const { allSelectStatus, setAllTreeSelect, setNodeSelect, refreshTreeSelect, getCheckedData } =
  useTreeSelect({
    props,
    emit,
    listRef
  });

let handleTime = 0;

/** 全选 */
function handleSelectAll() {
  if (!props.selectAll) {
    return;
  }
  if (props.noRelationship || props.childRelationship) {
    return;
  }
  const now = new Date().getTime();
  if (now - handleTime > 500) {
    setAllTreeSelect(allSelectStatus.value !== 'all');
  }
  handleTime = now;
}

/** 双击全选 */
function handleDblclickSelectAll() {
  setAllTreeSelect(allSelectStatus.value !== 'all');
}

/** 点击节点 */
function handleClickNode(node) {
  if (props.checkOnClickNode && props.type) {
    selectTreeNode(node);
  } else {
    props.expandOnClick && toggleTreeExpand(node);
  }
}

let handleKey = '';
/** 节点选择 */
function selectTreeNode(node) {
  if (props.disabledMethod(node)) {
    return;
  }
  const now = new Date().getTime();
  // 同一节点，500ms内反复点击无效
  if (props.type === 'radio' || handleKey !== node._KEY || now - handleTime > 500) {
    setNodeSelect(node);
  }
  handleKey = node._KEY;
  handleTime = now;
}

/** 双击节点 */
function handleDblclickNode(node) {
  if (props.disabledMethod(node)) {
    return;
  }
  // 父子不关联时，双击可重选
  if (props.childRelationship || props.noRelationship) {
    setNodeSelect(node, true, true);
  }
}

/**
 * 根据值手动选择当前树节点
 * @param key 节点绑定值
 * @param isSelect 是否选择
 * @param relate 是否关联子级（复选框下非联选下，决定是否关联子级）
 */
function setNodeSelectByKey(key, isSelect, relate = false) {
  const node = props.data.find((item) => item[props.valueKey] === key);
  if (node) {
    node._SELECT = !isSelect;
    setNodeSelect(node, relate);
  }
}

onActivated(() => {
  listRef.value?.refreshScroll();
});

defineExpose({
  setAllTreeSelect,
  setAllTreeExpand,
  refreshTreeSelect,
  refreshFilterExpand,
  getCheckedData,
  setNodeSelectByKey,
  ...getRefExposeFn(listRef, ['refreshScroll'])
});
</script>

<style scoped lang="scss">
.ex-tree-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  .ex-tree-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    font-size: 14px;
    color: #606266;

    .ex-header-node {
      display: flex;
      align-items: center;
      overflow: hidden;
      cursor: pointer;
    }
  }

  .ex-tree-body {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-size: 14px;

    .ex-tree-node {
      display: flex;
      align-items: center;
      cursor: pointer;

      .expand-icon {
        padding: 6px;
        font-size: 12px;
        color: #c0c4cc;
        transform: rotate(0deg);
        // TODO transition: transform 200ms;
      }

      .expand-rotate {
        transform: rotate(90deg);
      }

      .node-content {
        display: flex;
        flex: 1;
        align-items: center;
        overflow: hidden;
      }
    }

    .ex-tree-node:hover {
      background-color: #f5f7fa;
    }
  }
}

.node-icon {
  box-sizing: content-box;
  width: 14px;
  height: 14px;
  padding-right: 8px;

  :deep {
    .el-checkbox__inner,
    .el-checkbox__inner::after {
      transition: none;
    }
  }
}

.node-text {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  align-items: center;
  height: 26px;
  min-height: 26px;
  padding-right: 5px;
  overflow: hidden;
  border-bottom: 1px solid #0000;
  transition: color 200ms;
}

.node-border-bottom {
  border-bottom-color: #dfdfdf;
}

.node-highlight {
  color: #409eff;
}
</style>
