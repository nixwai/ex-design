<template>
  <el-select
    ref="selectRef"
    v-loading="selectLoading"
    element-loading-spinner="el-icon-loading"
    :value="value"
    :value-key="valueKey"
    :loading="selectLoading"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :remote="remote"
    :remote-method="remoteMethod"
    :filter-method="handleFilterMethod"
    v-bind="selectAttrs"
    class="ex-select"
    @visible-change="handleVisibleChange"
    v-on="selectListeners"
  >
    <template v-for="(_slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
    <template v-for="(alias, name) in slots" #[name]>
      <slot :name="alias" :slot-name="name" />
    </template>
    <template #default>
      <all-select
        v-if="selectAll && multiple"
        :down-options="downOptions"
        :value-key="valueKey"
        :group-key="childOrGroupKey"
        :disabled-method="disabledMethod"
        :hide-method="hideMethod"
        @select-all="handleChange"
      />
      <slot :name="slots.default || 'default'" />
    </template>
  </el-select>
</template>

<script>
export default {
  name: 'BaseSelect'
};
</script>

<script setup>
import { computed, ref, useAttrs, useListeners, watch } from 'vue';
import { useRequestConfig } from '../../../hooks/useRequestConfig';
import { toTreeArray, filterTreeArray } from '../../../utils/tree';
import { getRefExposeFn } from '../../../utils/component';
import { selectEmits, selectProps } from './select';
import AllSelect from './all-select.vue';

const props = defineProps({
  ...selectProps,
  /** 显示的下拉选项 */
  downOptions: {
    type: Array,
    default: () => []
  },
  /** 拍平后的所有下拉选择项 */
  flatAllOptions: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits([
  ...selectEmits,
  'filter-change',
  'update:flatAllOptions',
  'update:downOptions'
]);

const selectAttrs = computed(() => ({
  placeholder: '请选择' + props.label,
  'reserve-keyword': true,
  ...useAttrs()
}));
const selectListeners = useListeners();

const {
  data: selectOptions,
  loading: selectLoading,
  commitRequest
} = useRequestConfig({ dataKey: 'options', props, emit });

const childOrGroupKey = props.childKey || props.groupKey;
const filterText = ref();
/** 拍平选择项 */
const flatOptions = ref([]);

watch(
  selectOptions,
  (val) => {
    const addProps = !!props.childKey;
    flatOptions.value = toTreeArray(val, childOrGroupKey, addProps, props.deep);
    handleFilterMethod();
    emit('update:flatAllOptions', flatOptions.value);
  },
  { immediate: true }
);

/** 筛选选项 */
function handleFilterMethod(val = '') {
  filterText.value = val;
  let filterOptions = [];
  if (!props.remote || val) {
    setDataFilterStatus();
    filterOptions = val
      ? flatOptions.value.filter(
          (item) =>
            (item[childOrGroupKey] && item._IS_CHILD_FILTER) ||
            (!item[childOrGroupKey] && item._FILTER)
        )
      : flatOptions.value;
  }
  emit('update:downOptions', filterOptions);
  emit('filter-change', val);
}

/** 清空filterText在收起时 */
function handleVisibleChange(visible) {
  if (!visible && filterText.value) {
    // 等待收起动画结束后再更改
    setTimeout(() => {
      handleFilterMethod();
    }, 100);
  }
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

/** 设置的筛选状态 */
function setDataFilterStatus() {
  if (filterText.value) {
    filterTreeArray(flatOptions.value, childOrGroupKey, searchMethod);
  } else {
    flatOptions.value.forEach((item) => {
      item._FILTER = false;
      item._FILTER_RELATE = true;
      item._IS_CHILD_FILTER = false;
      return item;
    });
  }
}

/** 更改选项 */
function handleChange(val) {
  emit('change', val);
}

const selectRef = ref();

defineExpose({
  ...getRefExposeFn(selectRef, ['focus', 'blur']),
  commitRequest
});
</script>

<style scoped>
.ex-select {
  justify-content: v-bind(props.align);
  width: 100%;
  text-align: v-bind(props.align);
}

.ex-select >>> input {
  /* 选择项位置跟随align属性 */
  text-align: inherit;
}

.ex-select >>> .el-select__tags {
  /* 调整选择项为tags时位置跟随align属性 */
  display: flex;
  justify-content: inherit;
}

.ex-select >>> .el-loading-spinner {
  margin-top: -9px;
}
</style>
