<template>
  <div>
    <template v-for="(option, index) in options">
      <li v-if="option[groupKey]" :key="option[labelKey]" class="ex-group-title">
        {{ option[labelKey] }}
      </li>
      <div v-else :key="index">
        <el-option
          v-show="!hideMethod(option)"
          :key="option[valueKey]"
          :label="option[labelKey]"
          :value="option[valueKey]"
          :disabled="!!disabledMethod(option) || !!hideMethod(option)"
          style="width: 100%"
        >
          <slot :option="option" />
        </el-option>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseOptions'
};
</script>

<script setup>
defineProps({
  /** 选项 */
  options: {
    type: Array,
    default: () => []
  },
  /** 选项的标签key */
  labelKey: {
    type: String,
    default: 'label'
  },
  /** 选项的值key */
  valueKey: {
    type: String,
    default: 'value'
  },
  /** 分组的子级key，设置后选项将进行分组 */
  groupKey: {
    type: String,
    default: undefined
  },
  /** 禁用选项的方法，返回是否禁用 */
  disabledMethod: {
    type: Function,
    default: () => false
  },
  /** 显示选项的方法，返回是否显示 */
  hideMethod: {
    type: Function,
    default: () => false
  }
});
</script>

<style scoped>
.ex-group-title {
  box-sizing: border-box;
  width: 100%;
  padding-left: 20px;
  overflow: hidden;
  font-size: 12px;
  line-height: 27px;
  color: #909399;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
}

.ex-group-title::before {
  display: block;
  height: 1px;
  margin: 4px 20px 4px 0;
  content: '';
  background: #e4e7ed;
}

.ex-group-title:first-child::before {
  background: rgb(255 255 255 / 0%);
}
</style>
