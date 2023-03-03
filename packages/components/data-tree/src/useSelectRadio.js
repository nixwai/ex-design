/** 树单选 */
export function useSelectRadio({ props, selectedValue, selectedNode }) {
  /** 更新选择 */
  function updateTreeSelect() {
    selectedValue.value = props.value;
    if (selectedNode.value) {
      selectedNode.value._SELECT = false;
    }
    if (![null, undefined, ''].includes(selectedValue.value)) {
      const node = props.data.find((item) => item[props.valueKey] === selectedValue.value);
      if (node) {
        node._SELECT = true;
        selectedNode.value = node;
      }
    } else {
      selectedNode.value = undefined;
    }
  }

  /** 触发选择 */
  function handleTreeSelect(node) {
    const selected = !node._SELECT;
    node._SELECT = selected;
    if (selected) {
      if (selectedNode.value) {
        selectedNode.value._SELECT = false;
      }
      selectedNode.value = node;
      selectedValue.value = node[props.valueKey];
    } else {
      selectedNode.value = undefined;
      selectedValue.value = undefined;
    }
  }

  return {
    updateTreeSelect,
    handleTreeSelect
  };
}
