/** 多选选择 */
function selectMethod({ props, selectedValue, selectedNode }) {
  /** 添加选择项 */
  function insertSelect(node) {
    if (!node._SELECT) {
      node._SELECT = true;
      selectedValue.value.push(node[props.valueKey]);
      selectedNode.value.push(node);
    }
  }
  /** 去除选择项 */
  function removeSelect(node) {
    if (node._SELECT) {
      node._SELECT = false;
      const index = selectedValue.value.indexOf(node[props.valueKey]);
      if (index >= 0) {
        selectedValue.value.splice(index, 1);
        selectedNode.value.splice(index, 1);
      }
    }
  }
  /** 刷新选择 */
  function refreshSelect() {
    selectedValue.value = [];
    selectedNode.value = [];
    props.data.forEach((node) => {
      if (node._SELECT) {
        selectedValue.value.push(node[props.valueKey]);
        selectedNode.value.push(node);
      }
    });
  }
  /** 清空选择 */
  function clearSelect() {
    selectedNode.value.forEach((node) => {
      node._SELECT = false;
    });
    selectedValue.value = [];
    selectedNode.value = [];
  }
  return {
    insertSelect,
    removeSelect,
    refreshSelect,
    clearSelect
  };
}

/** 树多选 */
export function useSelectCheckBox({ props, selectedValue, selectedNode }) {
  selectedValue.value = [];
  selectedNode.value = [];
  const { insertSelect, removeSelect, refreshSelect, clearSelect } = selectMethod({
    props,
    selectedValue,
    selectedNode
  });

  /**
   * 更新选择
   *  refresh 是否刷新选择内容
   *  */
  function updateTreeSelect(refresh = false) {
    if (refresh) {
      refreshSelectValue();
    } else {
      if (!props.value?.length || props.noRelationship) {
        return;
      }
      // 更新所有父级选择状态
      for (let i = props.data.length - 1; i >= 0; i--) {
        setNodeParentSelect(props.data[i], false);
      }
    }
  }

  /** 刷新选择的数据 */
  function refreshSelectValue() {
    clearSelect();
    if (!props.value?.length) {
      return;
    }
    // 更新列表的选择状态
    const selectedList = [...props.value];
    for (let i = 0; i < props.data.length; i++) {
      const item = props.data[i];
      const index = selectedList.indexOf(item[props.valueKey]);
      if (index !== -1) {
        item._SELECT = true;
        selectedList.splice(index, 1);
        if (!selectedList.length) {
          break;
        }
      }
    }
    if (!props.noRelationship) {
      for (let i = props.data.length - 1; i >= 0; i--) {
        setNodeParentSelect(props.data[i], true);
      }
    }
    refreshSelect();
  }

  /**
   * 设置节点父级选中状态
   * @param node 节点
   * @param refresh 是否需要刷新
   *  */
  function setNodeParentSelect(node, refresh) {
    if (node._LEAF) {
      return;
    }
    const canHalf = !props.childRelationship; // 设置子联选时不需要半选
    let hasSelected = false;
    let hasUnselect = false;
    node._HALF = false;
    const nodeChild = node[props.childKey];
    for (let i = 0; i < nodeChild.length; i++) {
      if (canHalf && !nodeChild[i]._VISUAL) {
        continue;
      }
      if (nodeChild[i]._SELECT) {
        hasSelected = true;
        // 不设置半选情况，子级有选中时，直接设置节点为选中
        if (!canHalf) {
          hasUnselect = false;
          break;
        }
      } else {
        hasUnselect = true;
        // 子级有半选时，直接设置节点为半选
        if (nodeChild[i]._HALF) {
          node._HALF = true;
          break;
        }
      }
      // 子级既有已选也有非选为半选，直接设置节点为半选
      if (hasSelected && hasUnselect) {
        node._HALF = true;
        break;
      }
    }
    if (hasUnselect) {
      if (canHalf) {
        refresh ? (node._SELECT = false) : removeSelect(node);
      }
      return;
    }
    if (hasSelected) {
      refresh ? (node._SELECT = true) : insertSelect(node);
    }
  }

  /**
   * 触发节点选择
   * @param node 节点
   * @param relate 是否关联子级（复选框下非联选下，决定是否关联子级）
   * @param isDbc 是否双击选中，双击时，说明node已经选择过了，不要重复选择
   *  */
  function handleTreeSelect(node, relate = false, isDbc = false) {
    const selected = isDbc ? node._SELECT : !node._SELECT;
    if (!isDbc) {
      if (selected) {
        insertSelect(node);
      } else {
        removeSelect(node);
      }
    }
    node._HALF = false;
    // 子级联动选择父级
    if (!props.noRelationship && node._PARENT) {
      const refresh = !node._LEAF && !selected;
      const parentIndex = props.data.findIndex((item) => item._KEY === node._PARENT);
      let parentKey = node._PARENT;
      // 从父节点开始，从下往上遍历给所有父节点设置状态
      for (let i = parentIndex; i >= 0; i--) {
        const parentNode = props.data[i];
        if (parentNode._KEY !== parentKey) {
          continue;
        }
        const sourceHalf = parentNode._HALF;
        const sourceSelect = parentNode._SELECT;
        setNodeParentSelect(parentNode, refresh);
        const noChange = sourceHalf === parentNode._HALF && sourceSelect === parentNode._SELECT;
        parentKey = parentNode._PARENT;
        // 没有修改节点状态或者最后一个父节点停止遍历
        if (noChange || !parentKey) {
          break;
        }
        // 当节点状态为半选时，直接给所有父节点设置半选状态,并停止
        if (parentNode._HALF) {
          for (i--; i >= 0; i--) {
            const tempNode = props.data[i];
            if (tempNode._KEY !== parentKey) {
              continue;
            }
            if (tempNode._HALF) {
              break;
            }
            removeSelect(tempNode);
            tempNode._HALF = true;
            parentKey = tempNode._PARENT;
            if (parentKey) {
              break;
            }
          }
          break;
        }
      }
    }
    // 父级联动选择子级
    if (!node._LEAF && (relate || !props.noRelationship)) {
      if (selected) {
        if (relate || !props.childRelationship) {
          nodeChildSelected(node[props.childKey]);
        }
      } else {
        nodeChildUnSelect(node[props.childKey]);
        refreshSelect();
      }
    }
  }

  /** 父级联动选择 */
  function nodeChildSelected(nodeList, selected) {
    nodeList.forEach((node) => {
      if (!node._VISUAL) {
        return;
      }
      if (!props.disabledMethod(node)) {
        insertSelect(node);
      }
      node._HALF = false;
      if (!node._LEAF) {
        nodeChildSelected(node[props.childKey], selected);
      }
    });
  }

  /** 父级联动取消选择 */
  function nodeChildUnSelect(nodeList) {
    nodeList.forEach((node) => {
      // 当启用子联选时，无论节点可不可视都需取消选择
      if (props.childRelationship || node._VISUAL) {
        node._HALF = false;
        if (!props.disabledMethod(node)) {
          node._SELECT = false;
        }
        if (!node._LEAF) {
          nodeChildUnSelect(node[props.childKey]);
        }
      }
    });
  }

  /** 选择全部 */
  function setAllCheckbox(selected) {
    // 取第一层可视数据
    const visualData = props.data.filter((item) => item._LEVEL === 1 && item._VISUAL);
    if (selected) {
      nodeChildSelected(visualData);
    } else {
      nodeChildUnSelect(visualData);
      refreshSelect();
    }
    return selectedValue.value;
  }

  return {
    updateTreeSelect,
    handleTreeSelect,
    setAllCheckbox
  };
}
