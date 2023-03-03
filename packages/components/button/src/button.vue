<template>
  <el-button
    ref="buttonRef"
    :disabled="buttonDisabled"
    v-bind="buttonAttrs"
    :class="{ 'ex-button': hasMode }"
    :style="{
      'animation-duration': time,
      'pointer-events': buttonDisabled ? 'none' : 'all'
    }"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'ExButton',
  inheritAttrs: false
};
</script>

<script setup>
import { computed, onMounted, ref, useAttrs } from 'vue';

const props = defineProps({
  /** debounce：防抖；throttle：节流 */
  mode: {
    type: String,
    default: undefined
  },
  /** 间隔时间 */
  time: {
    type: String,
    default: '1s'
  },
  /** 禁用 */
  disabled: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['click']);

const buttonAttrs = computed(() => ({
  ...useAttrs()
}));

/** 禁止点击状态 */
const forbidStatus = ref(false);
const buttonDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }
  return props.mode === 'throttle' && forbidStatus.value;
});

const hasMode = ['throttle', 'debounce'].includes(props.mode);
const buttonRef = ref();

onMounted(() => {
  if (hasMode) {
    // 监听动画执行结束
    buttonRef.value.$el.addEventListener('animationend', () => {
      forbidStatus.value = false;
    });
  }
});

function handleClick(e) {
  if (forbidStatus.value) {
    return;
  }
  emit('click', e);
  if (hasMode) {
    forbidStatus.value = true;
  }
}
</script>

<style scoped>
.ex-button {
  animation: temp-animation step-end forwards;
}

.ex-button:active {
  animation: none;
}

@keyframes temp-animation {
  /** 空动画 */
}
</style>
