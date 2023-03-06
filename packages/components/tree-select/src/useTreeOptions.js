import { nextTick, ref, watch } from 'vue';

/** 选择为树型 */
export function useTreeOptions(selectRef, treeRef, props, emit) {
  const treeValue = ref();
  const treeCheckedOptions = ref([]);

  let tempValue;
  // 更新选择项
  watch(
    () => props.value,
    (val) => {
      // 判断绑定值与当前的选择值是否一致，不一致时更新树的选择值
      if (JSON.stringify(val) === JSON.stringify(tempValue)) {
        return;
      }
      tempValue = val;
      treeValue.value = val;
      nextTick(() => {
        const { data } = treeRef.value?.getCheckedData(props.checkStrategy);
        treeCheckedOptions.value = data ? (props.multiple ? data : [data]) : [];
      });
    },
    { immediate: true }
  );

  /** 触发树型选择 */
  function handleTreeChange() {
    const { value, data } = treeRef.value?.getCheckedData(props.checkStrategy);
    treeCheckedOptions.value = data ? (props.multiple ? data : [data]) : [];
    tempValue = value;
    emit('change', value, data);
    if (!props.multiple) {
      selectRef.value?.blur();
    }
  }

  const filterText = ref('');
  /** 搜索输入时刷新树 */
  function handleFilterChange(val = '') {
    filterText.value = val;
    if (props.childKey) {
      if (!filterText.value) {
        treeRef.value?.setAllTreeExpand(props.defaultExpandAll);
      } else {
        treeRef.value?.refreshFilterExpand();
      }
      treeRef.value?.refreshTreeSelect(false);
    }
  }

  return {
    treeValue,
    filterText,
    treeCheckedOptions,
    handleTreeChange,
    handleFilterChange
  };
}
