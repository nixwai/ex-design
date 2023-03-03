## Grid 栅格

基于 CSS Grid 样式封装，支持响应式，远离 IE。

### 基本使用

:::demo 设置`cols`属性显示列数，`x-gap`设置列间距，`y-gap`设置行间距

```vue
<template>
  <ex-grid cols="6" x-gap="10" y-gap="20">
    <div v-for="i in count" :key="i" style="height:100px;background:lightblue" />
  </ex-grid>
</template>

<script>
export default {
  data() {
    return {
      count: 12
    };
  }
};
</script>
```

:::

### 响应式

:::demo 插槽参数`col`可表示当前列数，参数`row`表示当前行数

```vue
<template>
  <el-input-number v-model="count" :min="0" />
  <hr />
  <ex-grid cols="5 500:6 800:8" x-gap="10" y-gap="10">
    <template #default="{ col, row }">
      <div v-for="i in count" :key="i" style="height:100px;background:lightblue" />
      <div style="height:100px">
        列数：{{ col }}
        <br />
        行数：{{ row }}
      </div>
    </template>
  </ex-grid>
</template>

<script>
export default {
  data() {
    return {
      count: 4
    };
  }
};
</script>
```

:::

### Attributes

| 参数  | 说明           | 类型   | 可选值 | 默认值 |
| ----- | -------------- | ------ | ------ | ------ |
| cols  | 显示的栅格数量 | string | —      | 24     |
| x-gap | 横向间隔槽     | number | —      | 0      |
| y-gap | 纵向间隔槽     | number | —      | 0      |

### Slots

| name    | 说明     | 参数      |
| ------- | -------- | --------- |
| default | 栅格内容 | {row,col} |

## Gi 栅格子项

搭配 ZGrid 使用，可配置子项的占用与偏移。

### 基本使用

:::demo 设置`span`属性配置子项的占用列数，值为`full`占用一行，`offset`可设置偏移列数，且都支持响应式，

```vue
<template>
  <el-input-number v-model="count" :min="0" />
  <hr />
  <ex-grid cols="5 500:6 800:8" x-gap="10" y-gap="10">
    <template #default="{ col, row }">
      <div v-for="i in count" :key="i" style="height:100px;background:lightblue" />
      <ex-gi offset="0 800:1" span="2 800:3" style="height:100px;background:lightgreen" />
      <div style="height:100px">
        列数：{{ col }}
        <br />
        行数：{{ row }}
      </div>
      <ex-gi span="full" style="height:100px;background:lightgreen" />
    </template>
  </ex-grid>
</template>

<script>
export default {
  data() {
    return {
      count: 4
    };
  }
};
</script>
```

:::

### Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| span   | 占用列数 | string | —      | 1      |
| offset | 偏移数量 | number | —      | 0      |
