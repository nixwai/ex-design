# RadioGroup 单选组

基于[el-radio](https://element.eleme.io/#/zh-CN/component/radio)二次封装的单选组组件。

将`el-radio`、`el-radio-group`、`el-radio-button`组件配置化为一体，一个组件便可实现不同的功能，其选择项配置类似 ZSelect，通过`options`实现不同选项配置。

### 基础用法

:::demo 使用`options`属性定义选择项，并使用`label-key`与`value-key`属性来定义选项标签与值的标识键名

```vue
<template>
  <div style="width: 300px">
    <ex-radio-group v-model="value" :options="options" label-key="name" value-key="id" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      options: [
        {
          id: 1,
          name: '市桥'
        },
        {
          id: 2,
          name: '大石'
        },
        {
          id: 3,
          name: '汉溪长隆'
        }
      ]
    };
  }
};
</script>
```

:::

### 边框样式

:::demo 设置`border`属性定义边框样式

```vue
<template>
  <div style="width: 300px">
    <ex-radio-group v-model="value" :options="options" label-key="name" value-key="id" border />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      options: [
        {
          id: 1,
          name: '市桥'
        },
        {
          id: 2,
          name: '大石'
        },
        {
          id: 3,
          name: '汉溪长隆'
        }
      ]
    };
  }
};
</script>
```

:::

### 按钮样式

:::demo 设置`button`属性定义边框样式，设置`full`属性可以将宽度铺满

```vue
<template>
  <div style="width: 300px">
    <ex-radio-group
      v-model="value"
      :options="options"
      label-key="name"
      value-key="id"
      button
      full
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      options: [
        {
          id: 1,
          name: '市桥'
        },
        {
          id: 2,
          name: '大石'
        },
        {
          id: 3,
          name: '汉溪长隆'
        }
      ]
    };
  }
};
</script>
```

:::

### 对齐方式

:::demo 通过设置 `align` 属性可以改变选项组位置，属性配置值参考[css justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)

```vue
<template>
  <div style="width: 300px">
    <ex-radio-group
      v-model="value"
      :options="options"
      label-key="name"
      value-key="id"
      align="center"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      options: [
        {
          id: 1,
          name: '市桥'
        },
        {
          id: 2,
          name: '大石'
        },
        {
          id: 3,
          name: '汉溪长隆'
        }
      ]
    };
  }
};
</script>
```

:::

### 有禁用选项

:::demo 通过 `disabled-method` 属性设置禁选方法，返回一个 boolean 决定选项是否禁选

```vue
<template>
  <div style="width: 300px">
    <ex-radio-group
      v-model="value"
      :options="options"
      label-key="name"
      value-key="id"
      :disabled-method="isDisabled"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      options: [
        {
          id: 1,
          name: '市桥'
        },
        {
          id: 2,
          name: '大石',
          disabled: true
        },
        {
          id: 3,
          name: '汉溪长隆'
        }
      ]
    };
  },
  methods: {
    isDisabled(option) {
      return option.disabled;
    }
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
    <ex-radio-group v-model="value" :options="options" label-key="name" value-key="id" disabled />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      options: [
        {
          id: 1,
          name: '市桥'
        },
        {
          id: 2,
          name: '大石'
        },
        {
          id: 3,
          name: '汉溪长隆'
        }
      ]
    };
  }
};
</script>
```

:::

### 自定义模板

使用插槽自定义选项

:::demo 使用`option`插槽自定义选项内容，使用参数`option`获取选项。可通过`slots.option`设置插槽名称

```vue
<template>
  <div style="width: 300px">
    <ex-radio-group v-model="value" :options="options" label-key="name" value-key="id">
      <template #option="{ option }">
        <span>{{ option.name }}</span>
        <span style="color: #8492a6; font-size: 13px">{{ option.key }}</span>
      </template>
    </ex-radio-group>
    <div style="margin: 20px"></div>
    <ex-radio-group
      v-model="value"
      :options="options"
      label-key="name"
      value-key="id"
      :slots="{ option: 'choice' }"
    >
      <template #choice="{ option }">
        <span style="color: #8492a6; font-size: 13px">{{ option.key }}</span>
        <span>{{ option.name }}</span>
      </template>
    </ex-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      options: [
        {
          id: 1,
          name: '市桥',
          key: 'SQ'
        },
        {
          id: 2,
          name: '大石',
          key: 'DS'
        },
        {
          id: 3,
          name: '汉溪长隆',
          key: 'HXCL'
        }
      ]
    };
  }
};
</script>
```

:::

### Attributes

| 参数            | 说明                                                                                                        | 类型                      | 可选值                 | 默认值   |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | -------- |
| value / v-model | 绑定值                                                                                                      | boolean / string / number | —                      | —        |
| align           | 对齐方式，配置值参考[css justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | string                    | left, center, right... | left     |
| options         | 选项组                                                                                                      | array                     | —                      | []       |
| label-key       | 选项的标签 key                                                                                              | string                    | —                      | label    |
| value-key       | 选项的值 key                                                                                                | string                    | —                      | value    |
| disabled-method | 禁用选项的方法，返回是否禁用                                                                                | function(option)          | —                      | —        |
| slots           | 修改插槽名，自定义插槽                                                                                      | object                    | —                      | —        |
| slots.option    | 选项内容插槽名                                                                                              | string                    | —                      | option   |
| disabled        | 是否禁用                                                                                                    | boolean                   | —                      | false    |
| size            | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效                                                  | string                    | medium/small/mini      | —        |
| text-color      | 按钮形式的 Radio 激活时的文本颜色                                                                           | string                    | —                      | \#ffffff |
| fill            | 按钮形式的 Radio 激活时的填充色和边框色                                                                     | string                    | —                      | \#409EFF |
| border          | 是否显示边框                                                                                                | boolean                   | —                      | false    |
| button          | 是否显示为按钮组                                                                                            | boolean                   | —                      | false    |

### Events

| 事件名称 | 说明                 | 回调参数     |
| -------- | -------------------- | ------------ |
| change   | 绑定值发生变化时触发 | 目前的选中值 |

### Slots

插槽的 name 可通过属性 slots 重命名

| name   | 说明     | 参数              |
| ------ | -------- | ----------------- |
| option | 选项内容 | {option,selected} |
