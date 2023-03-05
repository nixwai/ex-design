# EditItem 动态编辑组件

作为其他表单组件的集合，通过修改 component 属性便可更换组件，但一般不会单独使用，该组件主要作为其他配置化组件的子组件使用。

该组件基本继承于其他组件所有配置属性、事件、插槽及方法，区别在于数据绑定仅限于 change 事件，方法的调用需要先通过`getDom`方法获取组件的实例，再使用其内部方法。

component 除了传入内置的几种组件外，也支持直接传入其他组件。

### 使用内置组件

在 main.js 使用 setEditComponent 函数定义内置组件。

```js
import {
  ExInput,
  ExEditNumber,
  ExSelect,
  ExMoreSelect,
  ExRadioGroup,
  ExCheckboxGroup,
  ExCascader,
  setEditComponent
} from 'ex-design';

setEditComponent([
  ['Input', ExInput],
  ['EditNumber', ExEditNumber],
  ['Select', ExSelect],
  ['MoreSelect', ExMoreSelect],
  ['RadioGroup', ExRadioGroup],
  ['CheckboxGroup', ExCheckboxGroup],
  ['Cascader', ExCascader]
]);
```

:::demo 通过内置的组件 key 值配置所对应的组件类型

```vue
<template>
  <div style="width:300px">
    <span>EditNumber</span>
    <ex-edit-item v-model="value" component="EditNumber" thousands @change="handleChange" />
    <hr />
    <span>Select</span>
    <ex-edit-item v-model="value" component="Select" :options="options" @change="handleChange">
      <template #option="{ option }">
        <span :style="{ color: 'pink' }">{{ option.label }}</span>
      </template>
    </ex-edit-item>
    <hr />
    <span>MoreSelect</span>
    <ex-edit-item
      v-model="value"
      component="MoreSelect"
      :options="options"
      @change="handleChange"
    />
    <hr />
    <span>Input</span>
    <ex-edit-item
      v-model="value"
      component="Input"
      clearable
      :on="{
        input: handleChange
      }"
    />
    <hr />
    <span>RadioGroup</span>
    <ex-edit-item
      v-model="value"
      component="RadioGroup"
      :options="options"
      button
      full
      @change="handleChange"
    />
    <hr />
    <span>CheckboxGroup</span>
    <ex-edit-item
      v-model="valueList"
      component="CheckboxGroup"
      :options="options"
      border
      full
      @change="handleChange"
    />
    <hr />
    <span>Cascader</span>
    <ex-edit-item
      v-model="valueList"
      component="Cascader"
      :options="options"
      :props="{
        checkStrictly: true,
        multiple: true,
        emitPath: false
      }"
      collapse-tags
      :on="{
        change: handleChange
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueList: [],
      value: undefined,
      options: [
        {
          label: '你好',
          value: '1'
        },
        {
          label: '2023',
          value: '2'
        },
        {
          label: '新年快乐',
          value: '3',
          children: [
            {
              label: 'Hello',
              value: '4'
            },
            {
              label: 'World',
              value: '5'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
```

:::

### 直接传入组件

```vue
<template>
  <div style="width:300px">
    <ex-edit-item
      v-model="value"
      :component="Switch"
      active-text="开"
      inactive-text="关"
      :on="{
        change: handleChange
      }"
    />
  </div>
</template>

<script>
import { Switch } from 'element-ui';

export default {
  data() {
    return {
      value: true,
      Switch
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
```

:::tip

无论是内置组件还是直接传入组件方式生成，只要有事件，on 属性都可配置回调函数，方法的调用也都需要先通过`getDom`方法获取组件的实例，再使用其内部方法。

:::

### Attributes

| 参数                             | 说明                               | 类型          | 可选值                                                                     | 默认值 |
| -------------------------------- | ---------------------------------- | ------------- | -------------------------------------------------------------------------- | ------ |
| component                        | 内置的组件名称/组件                | string/object | EditNumber、Select、MoreSelect、Input、RadioGroup、CheckboxGroup、Cascader | —      |
| value / v-model                  | 绑定值                             | —             | —                                                                          | —      |
| align                            | 对齐方式                           | string        | left, center, right                                                        | —      |
| on                               | 组件事件的回调函数集合             | object        | —                                                                          | —      |
| ...传入 component 组件的本身属性 | 详细属性信息可根据组件对应文档配置 | —             | —                                                                          | —      |
