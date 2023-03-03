<template>
  <div>
    <el-option
      v-for="option in options"
      v-show="false"
      :key="option.key"
      :label="option.label"
      :value="option.value"
      disabled
    />
  </div>
</template>

<script>
export default {
  name: 'RenderOptions'
};
</script>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  /** 是否折叠 */
  isCollapse: {
    type: Boolean,
    default: false
  },
  /** 选择项 */
  selectedOptions: {
    type: Array,
    default: () => []
  },
  /** 最多可显示的tags数量 */
  maxTags: {
    type: [String, Number],
    default: 100
  }
});

const renderOptions = computed(() => {
  const len = props.isCollapse ? 1 : props.maxTags;
  const list = props.selectedOptions.slice(0, len);
  return list.filter((item) => item.isRender);
});

const options = ref([]);
watch(renderOptions, () => {
  options.value = renderOptions.value;
  // 短暂的渲染下，让选项回显即可
  setTimeout(() => {
    options.value = [];
  });
});
</script>
