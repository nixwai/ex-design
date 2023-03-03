# ResizeContent 大小调节容器

通过拖拽可调节容器宽度，点击按钮时收起或展开内容

### 基本使用

:::demo

```vue
<template>
  <div style="display: flex;height: 200px">
    <ex-resize-content style="width: 400px;margin-right: 15px">
      <div style="height: 100%;background:lightblue" />
    </ex-resize-content>
    <div style="flex: 1;background:lightgreen" />
  </div>
</template>
```

:::

### 调节展开的容器样式与收起的按钮位置

:::demo

```vue
<template>
  <div style="display: flex">
    <ex-resize-content offset="10" :content-style="{ marginRight: '15px' }">
      <ex-grid
        cols="5 500:6 800:8"
        x-gap="10"
        y-gap="10"
        style="border:1px #999 solid;padding: 10px"
      >
        <template #default="{ col, row }">
          <div v-for="i in 10" :key="i" style="height:100px;background:lightblue" />
        </template>
      </ex-grid>
    </ex-resize-content>
    <div style="flex: 1;background:lightgreen" />
  </div>
</template>
```

:::

### Attributes

| 参数         | 说明                           | 类型    | 可选值 | 默认值 |
| ------------ | ------------------------------ | ------- | ------ | ------ |
| offset       | 收起时按钮的偏移量             | number  | —      | 0      |
| max-width    | 拖拽的最大宽度                 | String  | —      | none   |
| min-width    | 拖拽的最小宽度                 | String  | —      | 150px  |
| resizable    | 是否启用大小调节               | Boolean | —      | true   |
| contentStyle | 展开时内容样式，会在收起时失效 | Object  | —      | —      |

### Slots

| name    | 说明 | 参数 |
| ------- | ---- | ---- |
| default | 内容 | —    |
