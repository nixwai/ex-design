<template>
  <div ref="contentRef" class="ex-resize-content" :style="showContain ? contentStyle : ''">
    <div v-show="showContain" class="ex-resize-body">
      <slot />
    </div>
    <div
      v-if="resizable"
      class="ex-resize-button"
      :style="{
        right: showContain ? '-8px' : offset - 8 + 'px'
      }"
      @mousedown="handleMousedown"
    >
      <i :class="[showContain ? 'el-icon-arrow-left' : 'el-icon-arrow-right']" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExResizeContent',
  inheritAttrs: false
};
</script>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { resizeContentProps } from './resize-content';

const props = defineProps(resizeContentProps);

const contentRef = ref();
let containWidth = '0';

onMounted(() => {
  containWidth = contentRef.value?.style.width;
});

let isMove = false;
const showContain = ref(true);

function handleMousedown(event) {
  event.target.setCaptrue; // 设置鼠标捕获(之后的事件捕获会作用在当前元素上)
  if (showContain.value) {
    const startX = event.clientX;
    const clientWidth = contentRef.value.clientWidth; // 容器的宽度
    document.onmousemove = (e) => {
      isMove = true;
      if (contentRef.value?.style) {
        const endX = e.clientX;
        const width = clientWidth - (startX - endX);
        containWidth = width + 'px';
        contentRef.value.style.width = containWidth;
      }
    };
  }
  document.onmouseup = (e) => {
    document.onmousemove = null;
    document.onmouseup = null;
    e.target.releaseCaptrue; // 释放鼠标捕获
    if (isMove) {
      isMove = false;
      return;
    }
    showContain.value = !showContain.value;
    nextTick(() => {
      contentRef.value.style.width = showContain.value ? containWidth : 0;
    });
  };
}
</script>

<style scoped>
.ex-resize-content {
  position: relative;
  box-sizing: border-box;
  width: 300px;
  min-width: v-bind(showContain? props.minwidth: 'none');
  max-width: v-bind(props.maxWidth);
  height: 100%;
  min-height: 80px;
}

.ex-resize-body {
  height: 100%;
}

.ex-resize-button {
  position: absolute;
  top: calc(50% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 80px;
  color: #909399;
  cursor: pointer;
  background-color: #e6e6e6;
  border-radius: 0 5px 5px 0;
}

.ex-resize-button:hover {
  background-color: rgb(213 213 213);
}
</style>
