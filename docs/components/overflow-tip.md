# OverflowTip 溢出提示

基于[el-tooltip](https://element.eleme.io/#/zh-CN/component/tooltip)二次封装的文本提示组件。

仅在文本溢出容器最大宽度时，鼠标移入可显示文本提示信息。

### 基础用法

:::demo 可使用`text`属性来定义文本

```vue
<template>
  <div style="width: 100%">
    <el-input v-model="text" />
    <div style="padding: 10px" />
    <ex-overflow-tip :text="text" max-width="150px" />
    <div style="padding: 10px" />
    <ex-overflow-tip :text="text" max-width="250px" />
    <div style="padding: 10px" />
    <ex-overflow-tip :text="text" max-width="50%" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '一个长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本'
    };
  }
};
</script>
```

:::

### 控制是否超出省略

:::demo 可使用`ellipsis`属性来控制文本是否超出省略

```vue
<template>
  <div style="width: 100%">
    <el-input v-model="text" />
    <div style="padding: 10px" />
    <el-button type="primary" @click="showEllipsis = !showEllipsis">
      {{ showEllipsis ? '显示全部' : '省略隐藏' }}
    </el-button>
    <div style="padding: 10px" />
    <ex-overflow-tip :text="text" max-width="50%" :ellipsis="showEllipsis" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '一个长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本',
      showEllipsis: true
    };
  }
};
</script>
```

:::

### 自定义提示信息

:::demo

```vue
<template>
  <div style="width: 100%">
    <ex-overflow-tip :text="value" max-width="250px">
      <template v-slot:content="{ text }">
        更多信息
        <br />
        {{ text }}
      </template>
    </ex-overflow-tip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '一个长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本'
    };
  }
};
</script>
```

:::

### el-link 包裹

:::demo

```vue
<template>
  <div style="width: 100%">
    <el-input v-model="text" />
    <div style="padding: 10px" />
    <el-link>
      <ex-overflow-tip :text="text" max-width="150px" />
    </el-link>
    <div style="padding: 10px" />
    <el-link>
      <ex-overflow-tip :text="text" max-width="250px" />
    </el-link>
    <div style="padding: 10px">(el-link默认插槽继承不了百分比属性)</div>
    <el-link style="max-width:50%">
      <ex-overflow-tip :text="text" />
    </el-link>
    <div style="padding: 10px">(可使用icon插槽代替，效果一致，推荐)</div>
    <el-link style="max-width:50%">
      <template #icon>
        <ex-overflow-tip :text="text" />
      </template>
    </el-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '一个长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本'
    };
  }
};
</script>
```

:::

### el-tag 包裹

:::demo

```vue
<template>
  <div style="width: 100%">
    <el-input v-model="text" />
    <div style="padding: 10px" />
    <el-tag>
      <ex-overflow-tip :text="text" max-width="150px" />
    </el-tag>
    <div style="padding: 10px" />
    <el-tag>
      <ex-overflow-tip :text="text" max-width="250px" />
    </el-tag>
    <div style="padding: 10px" />
    <el-tag closable>
      <ex-overflow-tip :text="text" max-width="250px" />
    </el-tag>
    <div style="padding: 10px" />
    <el-tag style="max-width: 50%">
      <ex-overflow-tip :text="text" />
    </el-tag>
    <div style="padding: 10px">(使用百分比时关闭按钮会溢出)</div>
    <el-tag style="max-width: 50%" closable>
      <ex-overflow-tip :text="text" />
    </el-tag>
    <div style="padding: 10px">(可适当减少ex-overflow-tip组件的宽度)</div>
    <el-tag style="max-width: 50%" closable>
      <ex-overflow-tip :text="text" max-width="calc(100% - 15px)" />
    </el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '一个长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本'
    };
  }
};
</script>
```

:::

### Attributes

| 参数           | 说明                                                                                                    | 类型    | 可选值                                                                                                    | 默认值                                                |
| -------------- | ------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| effect         | 默认提供的主题                                                                                          | String  | dark/light                                                                                                | dark                                                  |
| text           | 文本的内容                                                                                              | String  | —                                                                                                         | —                                                     |
| max-width      | 容器最大宽度                                                                                            | String  | css：max-width 属性值                                                                                     | 100%                                                  |
| ellipsis       | 控制是否显示省略                                                                                        | Boolean | —                                                                                                         | true                                                  |
| is-html        | text 文本是否为 html 格式，设置时默认插槽无效                                                           | Boolean | —                                                                                                         | false                                                 |
| placement      | Tooltip 的出现位置                                                                                      | String  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top                                                   |
| offset         | 出现位置的偏移量                                                                                        | Number  | —                                                                                                         | 0                                                     |
| transition     | 定义渐变动画                                                                                            | String  | —                                                                                                         | el-fade-in-linear                                     |
| open-delay     | 延迟出现，单位毫秒                                                                                      | Number  | —                                                                                                         | 0                                                     |
| enterable      | 鼠标是否可进入到 tooltip 中                                                                             | Boolean | —                                                                                                         | true                                                  |
| hide-after     | Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏                                               | number  | —                                                                                                         | 0                                                     |
| tabindex       | Tooltip 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number  | —                                                                                                         | 0                                                     |
| popper-class   | 为 Tooltip 的 popper 添加类名                                                                           | String  | —                                                                                                         | —                                                     |
| visible-arrow  | 是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper)        | Boolean | —                                                                                                         | true                                                  |
| popper-options | [popper.js](https://popper.js.org/documentation.html) 的参数                                            | Object  | 参考 [popper.js](https://popper.js.org/documentation.html) 文档                                           | { boundariesElement: 'body', gpuAcceleration: false } |

### Slots

| name    | 说明         | 参数   |
| ------- | ------------ | ------ |
| content | 提示信息内容 | {text} |
| default | 显示内容     | {text} |
