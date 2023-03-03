# Input 输入框

基于[el-input](https://element.eleme.io/#/zh-CN/component/input)二次封装的组件。

### 前置/后置内容

:::demo 通过设置 `prepend-text`、`append-text` 属性可以设置前置与后置内容，设置 `align` 属性可以改变文本位置，`precision`可修改精度

```vue
<template>
  <div style="width: 300px">
    <ex-input v-model="text" append-text="QQ" thousands />
    <div style="margin: 20px" />
    <ex-input v-model="text" prepend-text="输入" append-text="字符串" align="center" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
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
    <ex-input v-model="value" disabled />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
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
    <ex-input ref="numberRef" v-model="value" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ''
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

| 参数            | 说明                                                                                    | 类型             | 可选值                                                                                                                                | 默认值  |
| --------------- | --------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| type            | 类型                                                                                    | string           | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text    |
| value / v-model | 绑定值                                                                                  | string / number  | —                                                                                                                                     | —       |
| label           | 提供输入默认提示的名称                                                                  | string           | —                                                                                                                                     | -       |
| align           | 对齐方式                                                                                | string           | left, center, right                                                                                                                   | left    |
| maxlength       | 原生属性，最大输入长度                                                                  | number           | —                                                                                                                                     | —       |
| minlength       | 原生属性，最小输入长度                                                                  | number           | —                                                                                                                                     | —       |
| show-word-limit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效                | boolean          | —                                                                                                                                     | false   |
| placeholder     | 输入框占位文本                                                                          | string           | —                                                                                                                                     | —       |
| clearable       | 是否可清空                                                                              | boolean          | —                                                                                                                                     | false   |
| show-password   | 是否显示切换密码图标                                                                    | boolean          | —                                                                                                                                     | false   |
| disabled        | 禁用                                                                                    | boolean          | —                                                                                                                                     | false   |
| size            | 输入框尺寸，只在 `type!="textarea"` 时有效                                              | string           | medium / small / mini                                                                                                                 | —       |
| prepend-text    | 输入框前置内容                                                                          | string           | —                                                                                                                                     | —       |
| append-text     | 输入框后置内容                                                                          | string           | —                                                                                                                                     | —       |
| prefix-icon     | 输入框头部图标                                                                          | string           | —                                                                                                                                     | —       |
| suffix-icon     | 输入框尾部图标                                                                          | string           | —                                                                                                                                     | —       |
| rows            | 输入框行数，只对 `type="textarea"` 有效                                                 | number           | —                                                                                                                                     | 2       |
| autosize        | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | —                                                                                                                                     | false   |
| autocomplete    | 原生属性，自动补全                                                                      | string           | on, off                                                                                                                               | off     |
| auto-complete   | 下个主版本弃用                                                                          | string           | on, off                                                                                                                               | off     |
| name            | 原生属性                                                                                | string           | —                                                                                                                                     | —       |
| readonly        | 原生属性，是否只读                                                                      | boolean          | —                                                                                                                                     | false   |
| max             | 原生属性，设置最大值                                                                    | —                | —                                                                                                                                     | —       |
| min             | 原生属性，设置最小值                                                                    | —                | —                                                                                                                                     | —       |
| step            | 原生属性，设置输入字段的合法数字间隔                                                    | —                | —                                                                                                                                     | —       |
| resize          | 控制是否能被用户缩放                                                                    | string           | none, both, horizontal, vertical                                                                                                      | —       |
| autofocus       | 原生属性，自动获取焦点                                                                  | boolean          | true, false                                                                                                                           | false   |
| form            | 原生属性                                                                                | string           | —                                                                                                                                     | —       |
| tabindex        | 输入框的 tabindex                                                                       | string           | -                                                                                                                                     | -       |
| validate-event  | 输入时是否触发表单的校验                                                                | boolean          | -                                                                                                                                     | true    |
| slots           | 修改插槽名，自定义插槽                                                                  | object           | —                                                                                                                                     | —       |
| slots.prefix    | 输入框头部插槽名                                                                        | string           | —                                                                                                                                     | prefix  |
| slots.suffix    | 输入框尾部插槽名                                                                        | string           | —                                                                                                                                     | suffix  |
| slots.prepend   | 输入框前置插槽名                                                                        | string           | —                                                                                                                                     | prepend |
| slots.append    | 输入框后置插槽名                                                                        | string           | —                                                                                                                                     | append  |

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
