# EditNumber 数字编辑

基于[el-input](https://element.eleme.io/#/zh-CN/component/input)二次封装的数字类型输入组件。
可设置失去焦点时显示为千分符金额格式。

### 基础用法

:::demo 可使用`label`属性来定义默认的提示名称，设置`thousands`属性可使失去焦点时显示为千分符金额格式

```vue
<template>
  <div style="width: 300px">
    <ex-edit-number v-model="value" />
    <div style="margin: 20px" />
    <ex-edit-number v-model="amount" label="金额" thousands />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 111111.11,
      amount: 222222222.22
    };
  }
};
</script>
```

:::

### 前置/后置内容

:::demo 通过设置 `prepend-text`、`append-text` 属性可以设置前置与后置内容，设置 `align` 属性可以改变文本位置，`precision`可修改精度

```vue
<template>
  <div style="width: 300px">
    <ex-edit-number v-model="amount" append-text="元" thousands />
    <div style="margin: 20px" />
    <ex-edit-number
      v-model="value"
      prepend-text="第"
      append-text="天"
      min="0"
      precision="0"
      align="center"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 7475.1,
      value: 1
    };
  }
};
</script>
```

:::

### 固定步数

:::demo 通过 `step` 属性固定组件输入值只能为步数的倍数，`max`与`min`可设定最大与最小值，键盘上下键可调整数值

```vue
<template>
  <div style="width: 300px">
    <ex-edit-number v-model="value" step="2" max="10" min="-10" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0
    };
  }
};
</script>
```

:::

### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用组件

```vue
<template>
  <div style="width: 300px">
    <ex-edit-number v-model="value" disabled />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 1145.14
    };
  }
};
</script>
```

:::

### 获取焦点

:::demo

```vue
<template>
  <div style="width: 300px">
    <el-button type="primary" @click="handleClick">获取焦点</el-button>
    <div style="margin: 20px"></div>
    <ex-edit-number ref="numberRef" v-model="value" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 1
    };
  },
  methods: {
    handleClick() {
      this.$refs.numberRef.focus();
    }
  }
};
</script>
```

:::

### Attributes

| 参数            | 说明                               | 类型    | 可选值              | 默认值           |
| --------------- | ---------------------------------- | ------- | ------------------- | ---------------- |
| value / v-model | 绑定值                             | number  | —                   | 0                |
| label           | 提供输入默认提示的名称             | string  | —                   | -                |
| align           | 对齐方式                           | string  | left, center, right | left             |
| min             | 允许的最小值                       | number  | —                   | -Infinity        |
| max             | 允许的最大值                       | number  | —                   | Infinity         |
| step            | 固定只能输入 step 的倍数           | number  | —                   | 0                |
| thousands       | 是否失去焦点时显示为千分符金额格式 | boolean | —                   | false            |
| precision       | 数值精度                           | number  | —                   | 2                |
| size            | 输入框尺寸                         | string  | large, small, mini  | —                |
| disabled        | 是否禁用                           | boolean | —                   | false            |
| prepend-text    | 输入框前置内容                     | string  | —                   | —                |
| append-text     | 输入框后置内容                     | string  | —                   | —                |
| placeholder     | 输入框占位文本                     | string  | -                   | `请输入${label}` |
| clearable       | 是否可清空                         | boolean | —                   | false            |
| prefix-icon     | 输入框头部图标                     | string  | —                   | —                |
| suffix-icon     | 输入框尾部图标                     | string  | —                   | —                |
| name            | 原生属性                           | string  | —                   | —                |
| readonly        | 原生属性，是否只读                 | boolean | —                   | false            |
| autofocus       | 原生属性，自动获取焦点             | boolean | true, false         | false            |
| tabindex        | 输入框的 tabindex                  | string  | -                   | -                |
| validate-event  | 输入时是否触发表单的校验           | boolean | -                   | true             |
| slots           | 修改插槽名，自定义插槽             | object  | —                   | —                |
| slots.prefix    | 输入框头部插槽名                   | string  | —                   | prefix           |
| slots.suffix    | 输入框尾部插槽名                   | string  | —                   | suffix           |
| slots.prepend   | 输入框前置插槽名                   | string  | —                   | prepend          |
| slots.append    | 输入框后置插槽名                   | string  | —                   | append           |

### Events

| 事件名称 | 说明                                          | 回调参数                  |
| -------- | --------------------------------------------- | ------------------------- |
| change   | 绑定值被改变时触发                            | currentValue, oldValue    |
| blur     | 在组件 Input 失去焦点时触发                   | (event: Event)            |
| focus    | 在组件 Input 获得焦点时触发                   | (event: Event)            |
| input    | 输入时触发                                    | (value: string \| number) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |

### Slots

插槽的 name 可通过属性 slots 重命名

| name    | 说明           |
| ------- | -------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

### Methods

| 方法名 | 说明                                                | 参数 |
| ------ | --------------------------------------------------- | ---- |
| focus  | 使 input 获取焦点，获取焦点时也会选中文字，以便输入 | -    |
| blur   | 使 input 失去焦点                                   | —    |
| select | 选中 input 中的文字                                 | —    |
