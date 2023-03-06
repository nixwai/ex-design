<!-- eslint-disable vue/no-v-html -->
<template>
  <el-tooltip
    v-bind="tipAttrs"
    :content="text"
    :disabled="!showTip"
    :placement="placement"
    :value="false"
    :manual="false"
  >
    <template #content>
      <slot name="content" :text="text" />
    </template>
    <template v-if="isHtml">
      <span
        ref="textRef"
        class="ex-content-text"
        :class="{ 'ex-no-warp': ellipsis }"
        :style="{ maxWidth }"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        v-html="text"
      />
    </template>
    <template v-else>
      <span
        ref="textRef"
        class="ex-content-text"
        :class="{ 'ex-no-warp': ellipsis }"
        :style="{ maxWidth }"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
      >
        <slot :text="text">
          {{ text }}
        </slot>
      </span>
    </template>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ExOverflowTip',
  inheritAttrs: false
};
</script>

<script setup>
import { ref, useAttrs, watch } from 'vue';
import { overflowTipProps } from './overflow-tip';

const props = defineProps(overflowTipProps);

const tipAttrs = useAttrs();

watch(
  () => props.text,
  () => {
    showTip.value = false;
  }
);

const textRef = ref();
const showTip = ref(false);

function handleMouseenter() {
  // 文本实际宽度
  const textWidth = textRef.value?.scrollWidth;
  // 容器宽度
  const contentWidth = textRef.value?.clientWidth;
  showTip.value = textWidth > contentWidth;
}

function handleMouseleave() {
  if (tipAttrs.enterable === false) {
    showTip.value = false;
  }
}
</script>

<style scoped>
.ex-content-text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  vertical-align: bottom;
}

.ex-no-warp {
  white-space: nowrap;
}
</style>
