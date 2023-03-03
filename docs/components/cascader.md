# Cascader 级联选择器

基于[el-cascader](https://element.eleme.io/#/zh-CN/component/cascader)二次封装的选择器组件。

原组件基础上扩展`代理请求`功能，其他示例可查看[el-cascader](https://element.eleme.io/#/zh-CN/component/cascader)文档。

### 代理请求

:::demo 使用`request-config.api`属性定义请求方法，并使用`request-config.params`与`request-config.result`属性来定义请求的参数与绑定选项返回值，默认初始化时便会请求，可通过调用`commitRequest`方法来手动控制请求

```vue
<template>
  <div style="width: 300px">
    <el-button type="primary" @click="handleClick">刷新</el-button>
    <div style="margin: 20px"></div>
    <ex-cascader
      ref="selectRef"
      v-model="value"
      :options.sync="options"
      :props="{
        value: 'id',
        label: 'name',
        emitPath: false
      }"
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
              id: `${index}`,
              children: [
                {
                  name: `row_0_${index}`,
                  id: `${index}_0`
                },
                {
                  name: `row_1_${index}`,
                  id: `${index}_2`
                }
              ]
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

### Attributes

| 参数                    | 说明                                                                                                                             | 类型                            | 可选值                | 默认值    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | --------------------- | --------- |
| value / v-model         | 选中项绑定值                                                                                                                     | -                               | —                     | —         |
| options                 | 可选项数据源，键名可通过 `Props` 属性配置                                                                                        | array                           | —                     | —         |
| props                   | 配置选项，具体见下表                                                                                                             | object                          | —                     | —         |
| size                    | 尺寸                                                                                                                             | string                          | medium / small / mini | —         |
| placeholder             | 输入框占位文本                                                                                                                   | string                          | —                     | 请选择    |
| disabled                | 是否禁用                                                                                                                         | boolean                         | —                     | false     |
| clearable               | 是否支持清空选项                                                                                                                 | boolean                         | —                     | false     |
| show-all-levels         | 输入框中是否显示选中值的完整路径                                                                                                 | boolean                         | —                     | true      |
| collapse-tags           | 多选模式下是否折叠 Tag                                                                                                           | boolean                         | -                     | false     |
| separator               | 选项分隔符                                                                                                                       | string                          | —                     | 斜杠' / ' |
| filterable              | 是否可搜索选项                                                                                                                   | boolean                         | —                     | —         |
| filter-method           | 自定义搜索逻辑，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中                              | function(node, keyword)         | -                     | -         |
| debounce                | 搜索关键词输入的去抖延迟，毫秒                                                                                                   | number                          | —                     | 300       |
| before-filter           | 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选                                            | function(value)                 | —                     | —         |
| popper-class            | 自定义浮层类名                                                                                                                   | string                          | —                     | —         |
| requestConfig           | 请求代理配置                                                                                                                     | object                          | —                     | —         |
| requestConfig.api       | 获取选项的 api 请求方法                                                                                                          | async function                  | —                     | —         |
| requestConfig.params    | 定义请求的参数                                                                                                                   | any                             | —                     | —         |
| requestConfig.result    | 请求返回的选项对象路径，参考[Lodash：get](https://lodash.com/docs/4.17.15#get)函数的 path 参数，也可使用函数进行自定义返回的选项 | string\|function({status,data}) | —                     | —         |
| requestConfig.immediate | 是否在初始化时请求数据                                                                                                           | boolean                         | —                     | true      |
| slots                   | 修改插槽名，自定义插槽                                                                                                           | object                          | —                     | —         |
| slots.default           | 自定义备选项的节点内容插槽名                                                                                                     | string                          | —                     | default   |
| slots.empty             | 无匹配选项时的内容插槽名                                                                                                         | string                          | —                     | prefix    |

### Props

| 参数          | 说明                                                                                               | 类型                                                                                     | 可选值        | 默认值     |
| ------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------- | ---------- |
| expandTrigger | 次级菜单的展开方式                                                                                 | string                                                                                   | click / hover | 'click'    |
| multiple      | 是否多选                                                                                           | boolean                                                                                  | -             | false      |
| checkStrictly | 是否严格的遵守父子节点不互相关联                                                                   | boolean                                                                                  | -             | false      |
| emitPath      | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | boolean                                                                                  | -             | true       |
| lazy          | 是否动态加载子节点，需与 lazyLoad 方法结合使用                                                     | boolean                                                                                  | -             | false      |
| lazyLoad      | 加载动态数据的方法，仅在 lazy 为 true 时有效                                                       | function(node, resolve)，`node`为当前点击的节点，`resolve`为数据加载完成的回调(必须调用) | -             | -          |
| value         | 指定选项的值为选项对象的某个属性值                                                                 | string                                                                                   | —             | 'value'    |
| label         | 指定选项标签为选项对象的某个属性值                                                                 | string                                                                                   | —             | 'label'    |
| children      | 指定选项的子选项为选项对象的某个属性值                                                             | string                                                                                   | —             | 'children' |
| disabled      | 指定选项的禁用为选项对象的某个属性值                                                               | string                                                                                   | —             | 'disabled' |
| leaf          | 指定选项的叶子节点的标志位为选项对象的某个属性值                                                   | string                                                                                   | —             | 'leaf'     |

### Events

| 事件名称       | 说明                          | 回调参数                      |
| -------------- | ----------------------------- | ----------------------------- |
| change         | 当选中节点变化时触发          | 选中节点的值                  |
| expand-change  | 当展开节点发生变化时触发      | 各父级选项值组成的数组        |
| blur           | 当失去焦点时触发              | (event: Event)                |
| focus          | 当获得焦点时触发              | (event: Event)                |
| visible-change | 下拉框出现/隐藏时触发         | 出现则为 true，隐藏则为 false |
| remove-tag     | 在多选模式下，移除 Tag 时触发 | 移除的 Tag 对应的节点的值     |

### Methods

| 方法名          | 说明             | 参数                                                |
| --------------- | ---------------- | --------------------------------------------------- |
| getCheckedNodes | 获取选中的节点   | (leafOnly)=>data 是否只是叶子节点，默认值为 `false` |
| commitRequest   | 提交选项获取请求 | (params)=>({status,data})                           |

### Slots

| 名称    | 说明                                                                            |
| ------- | ------------------------------------------------------------------------------- |
| default | 自定义备选项的节点内容，参数为 { node, data }，分别为当前节点的 Node 对象和数据 |
| empty   | 无匹配选项时的内容                                                              |
