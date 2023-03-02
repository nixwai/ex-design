<template>
  <div>
    <vxe-switch />
    <el-button>一个卡片组ss件</el-button>
  </div>
</template>

<script>
export default {
  name: 'ExCard'
};
</script>

<script setup>
import { Switch as VxeSwitch } from 'vxe-table';
import { Button as ElButton } from 'element-ui';
</script>
