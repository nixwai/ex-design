# Select 选择器

基于[el-select](https://element.eleme.io/#/zh-CN/component/select)二次封装的下拉选择组件。

下拉选项可通过属性进行配置，已扩展**全选**、**代理请求**、**大数据支持**功能，如需更多扩展功能请查看复杂选择器[ExMoreSelect](/components/more-select)。

### 基础用法

:::demo 使用`options`属性定义选择项，并使用`label-key`与`value-key`属性来定义选项标签与值的标识键名

```vue
<template>
  <div style="width: 300px">
    <ex-select v-model="value" :options="options" label-key="name" value-key="id" />
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

### 大数据支持

el-select 不支持虚拟滚动，当数据过大时，其下拉选项只会显示前`reader-count`(默认 200)个，以防止卡顿，用户可通过详细搜索进行查询目标，当数据过大以至于 ex-more-select 也难以支持时，推荐使该方案，使用`remote`属性可使选项会在搜索输入后才显示。

:::demo

```vue
<template>
  <div style="width: 300px">
    <el-input-number v-model="count" :min="0" />
    <el-button @click="handleRefresh()">刷新</el-button>
    <hr />
    <ex-select v-model="value" :options="options" value-key="id" filterable remote />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1000,
      value: 500,
      options: []
    };
  },
  mounted() {
    this.getList(this.count);
  },
  methods: {
    handleRefresh() {
      this.getList(this.count);
      const start = new Date();
      setTimeout(() => {
        const end = new Date();
        console.log(`渲染${this.count}条数据用时：${end - start}`);
      });
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: index,
          label: `row_${index}`
        });
      }
      this.options = mockList;
    }
  }
};
</script>
```

:::

### 代理请求

:::demo 使用`request-config.api`属性定义请求方法，并使用`request-config.params`与`request-config.result`属性来定义请求的参数与绑定选项返回值，默认初始化时便会请求，可通过调用`commitRequest`方法来手动控制请求

```vue
<template>
  <div style="width: 300px">
    <el-button type="primary" @click="handleClick">刷新</el-button>
    <div style="margin: 20px"></div>
    <ex-select
      ref="selectRef"
      v-model="value"
      :options.sync="options"
      label-key="name"
      value-key="id"
      :request-config="{
        api: requestFn,
        params: size,
        result: 'data.list'
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      // 支持通过.sync绑定请求后的选择项
      options: [],
      size: 20
    };
  },
  methods: {
    async handleClick() {
      this.size++;
      await this.$refs.selectRef.commitRequest();
      console.log(this.options);
    },
    /** 模拟请求 */
    requestFn(size) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const list = [];
          for (let index = 0; index < size; index++) {
            list.push({
              name: `row_${index}`,
              id: index
            });
          }
          resolve({
            data: {
              list
            }
          });
        }, 2000);
      });
    }
  }
};
</script>
```

:::

### 全选

:::demo 设置属性`select-all`可以使添加全选按钮，点击选中的所有数据

```vue
<template>
  <div style="width: 300px">
    <ex-select
      v-model="value"
      :options="options"
      filterable
      multiple
      collapse-tags
      clearable
      select-all
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [1],
      options: [
        { value: 1, label: '测试1' },
        { value: 2, label: '测试2' },
        { value: 3, label: '测试3' },
        { value: 4, label: '测试4' },
        { value: 5, label: '测试5' },
        { value: 6, label: '测试6' },
        { value: 7, label: '测试7' },
        { value: 8, label: '测试8' }
      ]
    };
  }
};
</script>
```

:::

### 分组

:::demo 通过 `group-key` 设置选项分组的标识键名，分组名称标识键名与`label-key`一致

```vue
<template>
  <div style="width: 300px">
    <ex-select
      v-model="value"
      :options="options"
      label-key="name"
      value-key="id"
      group-key="children"
      multiple
      filterable
      select-all
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        {
          name: '三号线',
          children: [
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
        },
        {
          name: '六号线',
          children: [
            {
              id: 4,
              name: '横沙'
            },
            {
              id: 5,
              name: '浔峰岗'
            }
          ]
        }
      ]
    };
  }
};
</script>
```

:::

### 对齐方式

:::demo 通过设置 `align` 属性可以改变文本位置，可选值为 `left`、`center`、`right`

```vue
<template>
  <div style="width: 300px">
    <ex-select v-model="value" :options="options" label-key="name" value-key="id" align="center" />
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
    <ex-select
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

### 有隐藏选项

:::demo 通过 `hide-method` 属性设置隐藏选项的方法，返回一个 boolean 决定选项是否隐藏

```vue
<template>
  <div style="width: 300px">
    <ex-select
      v-model="value"
      :options="options"
      label-key="name"
      value-key="id"
      :hide-method="isHide"
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
          name: '市桥',
          delete: true
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
  },
  methods: {
    isHide(option) {
      return option.delete;
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
    <ex-select v-model="value" :options="options" label-key="name" value-key="id" disabled />
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

:::demo 使用`option`插槽自定义选项内容，使用参数`option`获取选项。可通过`slots.option`设置插槽名称，`prefix`与`empty`等插槽同理

```vue
<template>
  <div style="width: 300px">
    <ex-select v-model="value" :options="options" label-key="name" value-key="id">
      <template #prefix> ! </template>
      <template #option="{ option }">
        <span style="float: left">{{ option.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ option.key }}</span>
      </template>
    </ex-select>
    <div style="margin: 20px"></div>
    <ex-select
      v-model="value"
      :options="options"
      label-key="name"
      value-key="id"
      align="right"
      :slots="{ option: 'choice', prefix: 'pre' }"
    >
      <template #pre> ? </template>
      <template #choice="{ option }">
        <span style="float: left; color: #8492a6; font-size: 13px">{{ option.key }}</span>
        <span style="float: right">{{ option.name }}</span>
      </template>
    </ex-select>
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

### 获取焦点

:::demo

```vue
<template>
  <div style="width: 300px">
    <el-button type="primary" @click="handleClick">获取焦点</el-button>
    <div style="margin: 20px"></div>
    <ex-select ref="selectRef" v-model="value" :options="options" label-key="name" value-key="id" />
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
  },
  methods: {
    handleClick() {
      this.$refs.selectRef.focus();
    }
  }
};
</script>
```

:::

### Attributes

| 参数                    | 说明                                                                                                                             | 类型                            | 可选值              | 默认值     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------- | ---------- |
| value / v-model         | 绑定值                                                                                                                           | boolean / string / number       | —                   | —          |
| label                   | 提供输入默认提示的名称                                                                                                           | string                          | —                   | —          |
| align                   | 对齐方式                                                                                                                         | string                          | left, center, right | left       |
| options                 | 列表选项，支持通过.sync 绑定代理请求后的选择项                                                                                   | array                           | —                   | []         |
| label-key               | 选项的标签 key                                                                                                                   | string                          | —                   | label      |
| value-key               | 选项的值 key                                                                                                                     | string                          | —                   | value      |
| group-key               | 分组的子级 key，设置后选项将进行分组                                                                                             | string                          | —                   | —          |
| disabled-method         | 禁用选项的方法,返回是否禁用                                                                                                      | function(option)                | —                   | —          |
| hide-method             | 隐藏选项的方法,返回是否隐藏                                                                                                      | function(option)                | —                   | —          |
| requestConfig           | 请求代理配置                                                                                                                     | object                          | —                   | —          |
| requestConfig.api       | 获取选项的 api 请求方法                                                                                                          | async function                  | —                   | —          |
| requestConfig.params    | 定义请求的参数                                                                                                                   | any                             | —                   | —          |
| requestConfig.result    | 请求返回的选项对象路径，参考[Lodash：get](https://lodash.com/docs/4.17.15#get)函数的 path 参数，也可使用函数进行自定义返回的选项 | string\|function({status,data}) | —                   | —          |
| requestConfig.immediate | 是否在初始化时请求数据                                                                                                           | boolean                         | —                   | true       |
| slots                   | 修改插槽名，自定义插槽                                                                                                           | object                          | —                   | —          |
| slots.default           | option 组件插槽名                                                                                                                | string                          | —                   | default    |
| slots.prefix            | select 组件头部插槽名                                                                                                            | string                          | —                   | prefix     |
| slots.empty             | 无选项时的列表插槽名                                                                                                             | string                          | —                   | empty      |
| multiple                | 是否多选                                                                                                                         | boolean                         | —                   | false      |
| select-all              | 多选时是否可全选                                                                                                                 | boolean                         | —                   | false      |
| disabled                | 是否禁用                                                                                                                         | boolean                         | —                   | false      |
| size                    | 输入框尺寸                                                                                                                       | string                          | medium/small/mini   | —          |
| clearable               | 是否可以清空选项                                                                                                                 | boolean                         | —                   | false      |
| collapse-tags           | 多选时是否折叠，将选中值按数量文字的形式展示                                                                                     | boolean                         | —                   | false      |
| multiple-limit          | 多选时用户最多可以选择的项目数，为 0 则不限制                                                                                    | number                          | —                   | 0          |
| name                    | select input 的 name 属性                                                                                                        | string                          | —                   | —          |
| autocomplete            | select input 的 autocomplete 属性                                                                                                | string                          | —                   | off        |
| placeholder             | 占位符                                                                                                                           | string                          | —                   | 请选择     |
| filterable              | 是否可搜索                                                                                                                       | boolean                         | —                   | false      |
| allow-create            | 是否允许用户创建新条目，需配合 `filterable` 使用                                                                                 | boolean                         | —                   | false      |
| filter-method           | 自定义搜索方法                                                                                                                   | function                        | —                   | —          |
| rander-count            | 下拉选项最多可显示个数                                                                                                           | number                          | —                   | 200        |
| remote                  | 是否为搜索才显示下拉                                                                                                             | boolean                         | —                   | false      |
| remote-method           | 远程搜索方法                                                                                                                     | function                        | —                   | —          |
| loading                 | 是否正在从远程获取数据                                                                                                           | boolean                         | —                   | false      |
| loading-text            | 远程加载时显示的文字                                                                                                             | string                          | —                   | 加载中     |
| no-match-text           | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置                                                                         | string                          | —                   | 无匹配数据 |
| no-data-text            | 选项为空时显示的文字，也可以使用`slot="empty"`设置                                                                               | string                          | —                   | 无数据     |
| popper-class            | Select 下拉框的类名                                                                                                              | string                          | —                   | —          |
| reserve-keyword         | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词                                                                         | boolean                         | —                   | true       |
| default-first-option    | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用                                                         | boolean                         | -                   | false      |
| popper-append-to-body   | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false                                                   | boolean                         | -                   | true       |
| automatic-dropdown      | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单                                                                    | boolean                         | -                   | false      |

### Events

| 事件名称       | 说明                                     | 回调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| change         | 绑定值发生变化时触发                     | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除 tag 时触发                | 移除的 tag 值                 |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |
| blur           | 当 input 失去焦点时触发                  | (event: Event)                |
| focus          | 当 input 获得焦点时触发                  | (event: Event)                |

### Slots

插槽的 name 可通过属性 slots 重命名

| name    | 说明                | 参数     |
| ------- | ------------------- | -------- |
| default | 组件列表            |          |
| option  | 选项内容            | {option} |
| prefix  | Select 组件头部内容 |          |
| empty   | 无选项时的列表      |          |

### Methods

| 方法名        | 说明                            | 参数/返回值               |
| ------------- | ------------------------------- | ------------------------- |
| focus         | 使 input 获取焦点               | -                         |
| blur          | 使 input 失去焦点，并隐藏下拉框 | —                         |
| commitRequest | 提交选项获取请求                | (params)=>({status,data}) |
