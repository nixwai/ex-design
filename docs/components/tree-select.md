# TreeSelect 树形选择器

基于[more-select](/components/more-select)与[data-tree](/components/data-select)二次封装的树形下拉选择组件。

支持**大数据树形**数据结构的树形下拉选择。

### 基本使用

:::demo

```vue
<template>
  <div style="width: 300px">
    <el-input-number v-model="count" :min="0" />
    <el-button @click="handleRefresh()">刷新</el-button>
    <hr />
    <ex-tree-select v-model="value" :options="options" value-key="id" filterable />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1000,
      value: '_0',
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
          id: `_${index}`,
          label: `row_${index}`,
          children: [
            {
              id: index + '0',
              label: `row_0_${index}`
            },
            {
              id: index + '1',
              label: `row_1_${index}`
            }
          ]
        });
      }
      this.options = mockList;
    }
  }
};
</script>
```

:::

### 多选

:::demo

```vue
<template>
  <div style="width: 300px">
    <el-input-number v-model="count" :min="0" />
    <el-button @click="handleRefresh()">刷新</el-button>
    <hr />
    <ex-tree-select
      v-model="value"
      :options="options"
      value-key="id"
      clearable
      filterable
      multiple
      check-strategy="child"
      collapse-tags
      collapse-tags-tooltip
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1000,
      value: ['00', '01', '10', '11', '20', '21'],
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
        console.log(`渲染${this.count * 3}条数据用时：${end - start}`);
      });
    },
    handleChange() {
      console.log(this.value);
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: `_${index}`,
          label: `row_${index}`,
          children: [
            {
              id: index + '0',
              label: `row_0_${index}`
            },
            {
              id: index + '1',
              label: `row_1_${index}`
            }
          ]
        });
      }
      this.options = mockList;
    }
  }
};
</script>
```

:::

### 可全选

:::demo 需先使用`show-header`显示头部，再使用`select-all`显示全选按钮，非联选时需要双击才能触发全选

```vue
<template>
  <div style="width: 300px">
    <el-input-number v-model="count" :min="0" />
    <el-button @click="handleRefresh()">刷新</el-button>
    <hr />
    <ex-tree-select
      v-model="value"
      :options="options"
      value-key="id"
      clearable
      filterable
      show-header
      select-all
      multiple
      no-relationship
      collapse-tags
      collapse-tags-tooltip
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1000,
      value: ['01', '10', '11', '20', '21'],
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
        console.log(`渲染${this.count * 3}条数据用时：${end - start}`);
      });
    },
    handleChange() {
      console.log(this.value);
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: `_${index}`,
          label: `row_${index}`,
          children: [
            {
              id: index + '0',
              label: `row_0_${index}`
            },
            {
              id: index + '1',
              label: `row_1_${index}`
            }
          ]
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
    <ex-tree-select
      ref="selectRef"
      v-model="value"
      label-key="name"
      value-key="id"
      :request-config="{
        api: requestFn,
        params: size,
        result: 'data.list',
        immediate: false
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '_1',
      size: 1000
    };
  },
  methods: {
    async handleClick() {
      await this.$refs.selectRef.commitRequest();
    },
    /** 模拟请求 */
    requestFn(size) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockList = [];
          for (let index = 0; index < size; index++) {
            mockList.push({
              id: `_${index}`,
              name: `row_${index}`,
              children: [
                {
                  id: index + '0',
                  name: `row_0_${index}`
                },
                {
                  id: index + '1',
                  name: `row_1_${index}`
                }
              ]
            });
          }
          resolve({
            data: {
              list: mockList
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

### Attributes

| 参数                    | 说明                                                                                                                             | 类型                      | 可选值                    | 默认值                       |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------- | ---------------------------- |
| value / v-model         | 绑定值                                                                                                                           | boolean / string / number | —                         | —                            |
| label                   | 提供输入默认提示的名称                                                                                                           | string                    | —                         | —                            |
| align                   | 对齐方式                                                                                                                         | string                    | left, center, right       | left                         |
| options                 | 列表选项，支持通过.sync 绑定代理请求后的选择项                                                                                   | array                     | —                         | []                           |
| label-key               | 选项的标签 key                                                                                                                   | string                    | —                         | label                        |
| value-key               | 选项的值 key                                                                                                                     | string                    | —                         | value                        |
| child-key               | 树型下拉子级 key，设置后选项将为树型结构                                                                                         | string                    | —                         | children                     |
| deep                    | 是否启用深拷贝，当 options 用于多个树渲染时需要启用，深拷贝下 data 与用于渲染树的数据互不影响，但数据量过大时将影响性能          | Boolean                   | —                         | false                        |
| option-width            | 下拉选择列表的宽度                                                                                                               | string                    | —                         | auto                         |
| gt                      | 开启虚拟滚动时的最大行数                                                                                                         | number                    | —                         | 100                          |
| disabled-method         | 禁用选项的方法,返回是否禁用                                                                                                      | function(option)          | —                         | —                            |
| requestConfig           | 请求代理配置                                                                                                                     | object                    | —                         | —                            |
| requestConfig.api       | 获取选项的 api 请求方法                                                                                                          | async function            | —                         | —                            |
| requestConfig.params    | 定义请求的参数                                                                                                                   | any                       | —                         | —                            |
| requestConfig.result    | 请求返回的选项对象路径，参考[Lodash：get](https://lodash.com/docs/4.17.15#get)函数的 path 参数，也可使用函数进行自定义返回的选项 | string<br/>function       | —                         | —                            |
| requestConfig.immediate | 是否在初始化时请求数据                                                                                                           | boolean                   | —                         | true                         |
| slots                   | 修改插槽名，自定义插槽                                                                                                           | object                    | —                         | —                            |
| multiple                | 是否多选                                                                                                                         | boolean                   | —                         | false                        |
| select-all              | 多选时是否可全选，需要先设置 show-header                                                                                         | boolean                   | —                         | false                        |
| disabled                | 是否禁用                                                                                                                         | boolean                   | —                         | false                        |
| size                    | 输入框尺寸                                                                                                                       | string                    | medium<br/>small<br/>mini | —                            |
| clearable               | 是否可以清空选项                                                                                                                 | boolean                   | —                         | false                        |
| collapse-tags           | 多选时是否折叠，将选中值按数量文字的形式展示                                                                                     | boolean                   | —                         | false                        |
| max-tags                | 多选时，最多可显示的 tags 数量，超出时自动折叠                                                                                   | number                    | —                         | 100                          |
| collapse-tags-tooltip   | 折叠时，是否在鼠标移入时显示所有选中的标签                                                                                       | boolean                   | —                         | false                        |
| multiple-limit          | 多选时用户最多可以选择的项目数，为 0 则不限制                                                                                    | number                    | —                         | 0                            |
| name                    | select input 的 name 属性                                                                                                        | string                    | —                         | —                            |
| autocomplete            | select input 的 autocomplete 属性                                                                                                | string                    | —                         | off                          |
| placeholder             | 占位符                                                                                                                           | string                    | —                         | 请选择                       |
| filterable              | 是否可搜索                                                                                                                       | boolean                   | —                         | false                        |
| filter-method           | 自定义筛选方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏                                                | function(node)            | —                         | —                            |
| filter-keys             | 筛选目标的字段组，没有时选择 label-key                                                                                           | Array                     | —                         | —                            |
| remote                  | 是否为远程搜索                                                                                                                   | boolean                   | —                         | false                        |
| remote-method           | 远程搜索方法                                                                                                                     | function                  | —                         | —                            |
| loading                 | 是否正在从远程获取数据                                                                                                           | boolean                   | —                         | false                        |
| loading-text            | 远程加载时显示的文字                                                                                                             | string                    | —                         | 加载中                       |
| popper-class            | Select 下拉框的类名                                                                                                              | string                    | —                         | —                            |
| popper-append-to-body   | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false                                                   | boolean                   | -                         | true                         |
| automatic-dropdown      | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单                                                                    | boolean                   | -                         | false                        |
| check-strategy          | 复选时指定勾选回调返回的值，parent:包括父级；child:仅含子级；all: 包含半选                                                       | String                    | parent/child/all          | parent                       |
| highlight-current       | 是否高亮当前选中节点                                                                                                             | Boolean                   | —                         | true                         |
| cancelable              | 单选框下，选中之后是否允许取消                                                                                                   | Boolean                   | —                         | false                        |
| check-on-click-node     | 是否在点击节点的时候选中节点，false 时只有在点击选框时才会选中节点                                                               | Boolean                   | —                         | true                         |
| expand-on-click         | 树非可选类型或 check-on-click-node 为 false 时，控制在点击节点后是否展开或收缩节点                                               | Boolean                   | —                         | true                         |
| default-expand-all      | 是否默认展开的所有节点                                                                                                           | Boolean                   | —                         | false                        |
| default-expanded-keys   | 默认展开项                                                                                                                       | Array                     | —                         | []                           |
| accordion               | 是否使用手风琴展开模式                                                                                                           | Boolean                   | —                         | false                        |
| no-relationship         | 复选框的情况下，是否遵循父子不互相关联的做法                                                                                     | Boolean                   | —                         | false                        |
| child-relationship      | 复选框的情况下，是否只遵循子关联，即复选框的情况下，是否遵循子关联，而父不关联的做法                                             | Boolean                   | —                         | false                        |
| show-header             | 是否显示头部                                                                                                                     | Boolean                   | —                         | false                        |
| header-title            | 头部信息显示文本                                                                                                                 | String                    | —                         | 全部                         |
| expand-all              | 是否在筛选框或头部显示展开全部按钮                                                                                               | Boolean                   | —                         | true                         |
| highlight-filter        | 是否高亮筛选内容，注意：使用时无法使用自定义内容插槽，可使用 label-html 替换                                                     | Boolean                   | —                         | false                        |
| label-html              | 自定义显示节点内容，使用${}拼接字段，支持html格式，如'我叫${name}性别${sex}'                                                     | String                    | —                         | —                            |
| filter-color            | 筛选高亮的颜色                                                                                                                   | String                    | —                         | #f22b2b                      |
| show-irrelevant-nodes   | 是否显示搜索无关节点                                                                                                             | Boolean                   | —                         | false                        |
| indent                  | 相邻级节点间的水平缩进，单位为像素                                                                                               | number                    | —                         | 18                           |
| show-select-icon        | 是否显示选择图标                                                                                                                 | Boolean                   | —                         | 多选时为 true,单选时为 false |

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

| name   | 说明                         | 参数     |
| ------ | ---------------------------- | -------- |
| option | option 选项内容              | {option} |
| prefix | Select 组件头部内容          |          |
| header | 位于组件头部内容与搜索框之间 |          |
| empty  | 无选项时的列表               |          |
| title  | 树头部标题内容               |          |

### Methods

| 方法名        | 说明                            | 参数 |
| ------------- | ------------------------------- | ---- |
| focus         | 使 input 获取焦点               | -    |
| blur          | 使 input 失去焦点，并隐藏下拉框 | —    |
| commitRequest | 提交选项获取请求                | —    |
