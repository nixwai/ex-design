<template>
  <div ref="tooltipRef" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <slot :down-width="downWidth" />
    <el-tooltip
      v-if="isTooltip"
      v-model="showTooltip"
      effect="light"
      placement="bottom-start"
      :manual="false"
    >
      <div style="width: 80px" />
      <div
        slot="content"
        :style="{ 'max-width': tooltipWidth }"
        class="ex-tooltip-options"
        @mouseenter="isOnTooltip = true"
        @mouseleave="isOnTooltip = false"
      >
        <el-tag
          v-for="(option, index) in selectedOptions"
          :key="option.key"
          :closable="!disabled"
          :disable-transitions="true"
          type="info"
          size="small"
          class="ex-tooltip-tag"
          @close="handleClose(option, index)"
        >
          <span
            class="ex-tag-content"
            :style="{ 'max-width': disabled ? '100%' : 'calc(100% - 12px)' }"
          >
            {{ option.label }}
          </span>
        </el-tag>
        <el-tag
          v-if="value.length > selectedOptions.length"
          type="info"
          size="small"
          style="margin: 2px; cursor: pointer"
          @click="handleMore"
        >
          更多
        </el-tag>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TooltipOptions'
};
</script>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number, Array, Boolean],
    default: () => []
  },
  visible: {
    type: Boolean,
    default: false
  },
  isTooltip: {
    type: Boolean,
    default: false
  },
  optionWidth: {
    type: String,
    default: 'auto'
  },
  selectedOptions: {
    type: Array,
    default: () => []
  },
  setSelectedOptions: {
    type: Function,
    default: () => {}
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

/** 组件宽度 */
const domWidth = ref(0);
/** 下拉列表宽度 */
const downWidth = computed(() => {
  if (props.optionWidth.slice(-1) === '%') {
    return domWidth.value * (props.optionWidth.slice(0, -1) / 100) + 'px';
  }
  return props.optionWidth;
});
/** 提示框宽度 */
const tooltipWidth = computed(() => {
  return `calc(${downWidth.value === 'auto' ? domWidth.value + 'px' : downWidth.value} - 20px)`;
});

const tooltipRef = ref();
/** 鼠标是否在选择器上 */
const isOnSelect = ref(false);

function handleMouseenter() {
  isOnSelect.value = true;
  domWidth.value = tooltipRef.value.clientWidth;
}
function handleMouseleave() {
  isOnSelect.value = false;
}

let timer = null;
const showTooltip = ref(false);

watch([() => props.visible, isOnSelect], () => {
  if (!props.isTooltip || props.visible) {
    showTooltip.value = false;
    clearTimeout(timer);
    timer = null;
  } else {
    changeTooltip();
  }
});

const isOnTooltip = ref(false);

function changeTooltip() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    showTooltip.value = isOnTooltip.value || isOnSelect.value;
  }, 200);
}

/** 查看更多 */
function handleMore() {
  props.setSelectedOptions(props.selectedOptions.length + 50);
}

/** 删除选项 */
function handleClose(option, index) {
  emit('close', option, index);
}
</script>

<style scoped>
.ex-tooltip-options {
  max-height: 200px;
  overflow: auto;
}

.ex-tooltip-tag {
  max-width: calc(100% - 4px);
  margin: 2px;
}

.ex-tag-content {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
  vertical-align: bottom;
}

.ex-tooltip-options::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

.ex-tooltip-options::-webkit-scrollbar-thumb {
  background-color: rgb(144 147 153 / 30%);
  border-radius: 4px;
}

.ex-tooltip-options::-webkit-scrollbar-thumb:hover {
  background-color: rgb(144 147 153 / 50%);
}
</style>
