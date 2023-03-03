import { ref, watch } from 'vue';
import { useSelectRadio } from './useSelectRadio';
import { useSelectCheckBox } from './useSelectCheckbox';
import { cloneDeep } from 'lodash-es';

/** 树的选择控制 */
export function useTreeSelect({ props, emit, listRef }) {
  if (!['checkbox', 'radio'].includes(props.type)) {
    return {
      allSelectStatus: 'none',
      setNodeSelect: () => {},
      setAllTreeSelect: () => {},
      refreshTreeSelect: () => {},
      getCheckedData: () => {}
    };
  }
  /** 选择的节点 */
  const selectedNode = ref();
  /** 选择的值 */
  const selectedValue = ref();
  /** 树的选择状态：all(全选)，half(半选)，none(无选) */
  const allSelectStatus = ref('none');

  const useSelectType = props.type === 'checkbox' ? useSelectCheckBox : useSelectRadio;

  const {
    updateTreeSelect,
    handleTreeSelect,
    setAllCheckbox = () => {}
  } = useSelectType({
    props,
    selectedNode,
    selectedValue
  });

  // 树更新时刷新选择
  watch(
    () => props.data,
    () => {
      refreshTreeSelect(true);
    },
    { immediate: true }
  );

  // 绑定选择的节点
  watch(
    () => props.value,
    () => {
      // 判断绑定值与树当前的选择值是否一致，不一致时更新树的选择
      if (JSON.stringify(props.value) === JSON.stringify(selectedValue.value)) {
        return;
      }
      refreshTreeSelect(true);
    },
    { immediate: true }
  );

  // 显示与隐藏无关节点切换
  watch(
    () => props.showIrrelevantNodes,
    () => {
      refreshTreeSelect(false);
    }
  );

  /**
   * 更新选择
   * @param refreshSelect 是否刷新重置选择项
   *  */
  function refreshTreeSelect(refreshSelect) {
    updateTreeSelect(refreshSelect);
    setAllSelectStatus();
    refreshList();
  }

  /** 设置全选状态 */
  function setAllSelectStatus() {
    // 仅复选框，有树头，可全选需要
    if (props.type !== 'checkbox' || !props.showHeader || !props.selectAll) {
      return;
    }
    let hasSelected = false;
    let hasUnselect = false;
    for (let i = 0; i < props.data.length; i++) {
      const item = props.data[i];
      if (!item._VISUAL) {
        continue;
      }
      if (item._SELECT) {
        hasSelected = true;
      } else {
        hasUnselect = true;
        // 有半选时，直接设置节点为半选
        if (item._HALF) {
          allSelectStatus.value = 'half';
          return;
        }
      }
      // 子级既有已选也有非选为半选，直接设置节点为半选
      if (hasSelected && hasUnselect) {
        allSelectStatus.value = 'half';
        return;
      }
    }
    if (hasSelected) {
      allSelectStatus.value = 'all';
    } else {
      allSelectStatus.value = 'none';
    }
  }

  /**
   * 触发节点选择
   * @param node 节点
   * @param relate 是否关联子级（复选框下非联选下，决定是否关联子级）
   * @param isDbc 是否为双击选择
   *  */
  function setNodeSelect(node, relate = false, isDbc = false) {
    if (!['checkbox', 'radio'].includes(props.type)) {
      return;
    }
    if (props.type === 'radio') {
      if (node._SELECT && !props.cancelable) {
        // 单选不允许取消
        return;
      }
    }
    // node仅为父节点时，才可触发选择
    if (isDbc && node._LEAF) {
      return;
    }
    handleTreeSelect(node, relate, isDbc);
    setAllSelectStatus();
    refreshList();
    const value = cloneDeep(selectedValue.value);
    emit('change', value);
    return value;
  }

  /** 设置全部选择 */
  function setAllTreeSelect(select) {
    if (props.type === 'checkbox') {
      allSelectStatus.value = select ? 'all' : 'none';
      setAllCheckbox(select);
      refreshList();
      const value = cloneDeep(selectedValue.value);
      emit('change', value);
      return value;
    }
  }

  /** 刷新列表，更新选择状态 */
  function refreshList() {
    listRef.value?.$forceUpdate();
  }

  /**
   * 获取选中的数据
   * @param checkStrategy parent:包括父级；child:仅含子级；all: 包含半选
   *  */
  function getCheckedData(checkStrategy) {
    if (props.type === 'checkbox') {
      if (checkStrategy === 'all') {
        const data = props.data.filter((node) => node._HALF || node._SELECT);
        const value = data.map((node) => node[props.valueKey]);
        return { value, data };
      }
      if (checkStrategy === 'child') {
        const data = props.data.filter((node) => node._SELECT && node._LEAF);
        const value = data.map((node) => node[props.valueKey]);
        return { value, data };
      }
    }
    const data = selectedNode.value;
    const value = cloneDeep(selectedValue.value);
    return { value, data };
  }

  return {
    allSelectStatus,
    setNodeSelect,
    setAllTreeSelect,
    refreshTreeSelect,
    getCheckedData
  };
}
