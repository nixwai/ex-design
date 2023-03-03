import { nextTick, ref, watch } from 'vue';

export function useSelectedOptions({ props, flatAllOptions, initLen }) {
  const selectedOptions = ref([]);

  /** value更新时是否自动更新selectedOptions */
  const isAutomatic = ref(true);
  const selectVal = ref(props.value);
  watch(
    [flatAllOptions, () => props.value],
    () => {
      if (isAutomatic.value) {
        initSelectedOptions();
      }
      isAutomatic.value = true;
      selectVal.value = null;
      nextTick(() => {
        if (!props.value && props.multiple) {
          selectVal.value = [];
          return;
        }
        selectVal.value = props.value;
      });
    },
    { immediate: true }
  );

  /** 初始化已选择项 */
  function initSelectedOptions() {
    selectedOptions.value = [];
    const len = Math.max(initLen.value, selectedOptions.value.length);
    setSelectedOptions(len);
  }

  function setSelectedOptions(end) {
    if (['', null, undefined].includes(props.value) || !end) {
      return;
    }
    let valList = Array.isArray(props.value) ? [...props.value] : [props.value];
    const start = selectedOptions.value.length;
    if (end > valList.length) {
      end = valList.length;
    }
    for (let i = start; i < end; i++) {
      selectedOptions.value.push({
        isRender: false, // 是否有可对应值的选择项渲染
        value: valList[i],
        label: valList[i]
      });
    }
    const optionsLen = flatAllOptions.value.length;
    valList = valList.slice(start, end);
    let dataLen = end - start;
    for (let i = 0; i < optionsLen && dataLen > 0; i++) {
      const option = flatAllOptions.value[i];
      const index = valList.indexOf(option[props.valueKey]);
      if (index !== -1) {
        selectedOptions.value[start + index].isRender = true;
        selectedOptions.value[start + index].label = option[props.labelKey];
        dataLen--;
      }
    }
  }

  /** 移除已选择项 */
  function removeSelected(index) {
    selectedOptions.value.splice(index, 1);
    isAutomatic.value = false;
  }

  return {
    selectVal,
    selectedOptions,
    isAutomatic,
    setSelectedOptions,
    removeSelected
  };
}
