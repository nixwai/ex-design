# Button 特殊按钮

基于 [el-button](https://element.eleme.io/#/zh-CN/component/button)封装，新增**防抖**、**节流**功能
:::demo 设置`mode`属性选择模式，`debounce`表示防抖模式，`throttle`表示节流模式，`time`设置间隔时间，默认 1s

```vue
<template>
  {{ count }}
  <hr />
  <ex-button size="small" type="primary" mode="debounce" time="1500ms" @click="count++">
    防抖
  </ex-button>
  <ex-button size="small" type="primary" mode="throttle" time="2s" @click="count++">
    节流
  </ex-button>
</template>

<script>
export default {
  name: 'ex-button-demo',
  data() {
    return {
      count: 0
    };
  }
};
</script>
```

:::

### 属性

| 参数        | 说明                                             | 类型    | 可选值                                             | 默认值 |
| ----------- | ------------------------------------------------ | ------- | -------------------------------------------------- | ------ |
| mode        | 特殊点击模式，`debounce`：防抖，`throttle`：节流 | string  | throttle/debounce                                  | —      |
| time        | 防抖或节流的时间间隔                             | string  |                                                    | 1s     |
| size        | 尺寸                                             | string  | medium / small / mini                              | —      |
| type        | 类型                                             | string  | primary / success / warning / danger / info / text | —      |
| plain       | 是否朴素按钮                                     | boolean | —                                                  | false  |
| round       | 是否圆角按钮                                     | boolean | —                                                  | false  |
| circle      | 是否圆形按钮                                     | boolean | —                                                  | false  |
| loading     | 是否加载中状态                                   | boolean | —                                                  | false  |
| disabled    | 是否禁用状态                                     | boolean | —                                                  | false  |
| icon        | 图标类名                                         | string  | —                                                  | —      |
| autofocus   | 是否默认聚焦                                     | boolean | —                                                  | false  |
| native-type | 原生 type 属性                                   | string  | button / submit / reset                            | button |

### 事件

| 事件名称 | 说明     | 回调参数       |
| -------- | -------- | -------------- |
| click    | 点击触发 | (event: Event) |
