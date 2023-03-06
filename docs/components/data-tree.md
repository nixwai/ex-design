# DataTree 大数据树

使用 [vxe-list](https://vxetable.cn/v3/#/table/module/list)封装虚拟滚蛋，依照 el-tree 风格制作，但基本使用配置并不一致，除了基本的单选、双选功能，该组件支持**数据双向绑定**、**数据筛选**、**高亮筛选结果**、**复选框下父子不联选与仅子联选**、**非联选下双击可触发联选**、**自定义筛选**等功能。

### 基础用法

`show-header`可显示树型的头部内容，默认带有全展开的控制按钮，可设置`expand-all`控制按钮显示，`default-expanded-keys`可配置默认展开项，`accordion`为手风琴模式，`filterable`是否显示筛选框。

:::demo

```vue
<template>
  <div>
    <el-input-number v-model="count" :min="0" />
    <el-button @click="handleRefresh()">刷新</el-button>
    <hr />
    <ex-data-tree
      :data="options"
      show-header
      filterable
      :default-expanded-keys="['0']"
      accordion
      value-key="id"
      header-title="在这里种一颗树"
      style="width:200px;height: 300px"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1000,
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
        console.log(`渲染${this.count * 5}条数据用时：${end - start}`);
      });
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: `${index}`,
          label: `row_${index}`,
          children: [
            {
              id: index + '_0',
              label: `row_${index}_0`
            },
            {
              id: index + '_1',
              label: `row_${index}_1`
            },
            {
              id: index + '_2',
              label: `row_${index}_2`,
              children: [
                {
                  id: index + '_2_1',
                  label: `row_${index}_2_0`
                }
              ]
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

:::demo

```vue
<template>
  <div>
    <el-input-number v-model="count" :min="0" />
    <el-button @click="handleRefresh()">刷新</el-button>
    <hr />
    <ex-data-tree
      ref="treeRef"
      filterable
      value-key="id"
      :request-config="{
        api: requestFn,
        params: count,
        result: 'data',
        immediate: false
      }"
      style="width:200px;height: 300px"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1000
    };
  },
  methods: {
    async handleRefresh() {
      await this.$refs.treeRef.commitRequest();
    },
    requestFn(size) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockList = [];
          for (let index = 0; index < size; index++) {
            mockList.push({
              id: `${index}`,
              label: `row_${index}`,
              children: [
                {
                  id: index + '_0',
                  label: `row_${index}_0`
                },
                {
                  id: index + '_1',
                  label: `row_${index}_1`
                },
                {
                  id: index + '_2',
                  label: `row_${index}_2`,
                  children: [
                    {
                      id: index + '_2_1',
                      label: `row_${index}_2_0`
                    }
                  ]
                }
              ]
            });
          }
          resolve({
            data: mockList
          });
        }, 2000);
      });
    }
  }
};
</script>
```

:::

### 单选

`type`设置为 radio 时表示单选，当 data 的渲染树数据用于多个树需要启用`deep`进行深拷贝数据，否则将树之间的数据将会互相影响，`check-on-click-node`可控制是否点击节点时便被选中，`highlight-current`则是高亮选中项，单选下设置`cancelable`可防止取消选择，`show-select-icon`控制图标的显示

:::demo

```vue
<template>
  <div style="display: flex">
    <ex-data-tree
      v-model="value"
      :data="options"
      value-key="id"
      type="radio"
      show-header
      deep
      :resizable="false"
      :check-on-click-node="false"
      :highlight-current="false"
      style="width:200px;height: 300px"
      @change="handleChange"
    />
    <ex-data-tree
      v-model="value"
      :data="options"
      value-key="id"
      type="radio"
      show-header
      deep
      :cancelable="false"
      :show-select-icon="false"
      style="width:200px;height: 300px"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '2',
      options: []
    };
  },
  mounted() {
    this.getList(1000);
  },
  methods: {
    handleChange() {
      console.log(this.value);
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: `${index}`,
          label: `row_${index}`,
          children: [
            {
              id: index + '_0',
              label: `row_${index}_0`
            },
            {
              id: index + '_1',
              label: `row_${index}_1`
            },
            {
              id: index + '_2',
              label: `row_${index}_2`,
              children: [
                {
                  id: index + '_2_1',
                  label: `row_${index}_2_0`
                }
              ]
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

type="checkbox"时为多选，多选下设置`show-header`默认会带有全选框，设置`select-all`可控制显示，`default-expand-all`设置树数据更新后是否展开全部，`show-irrelevant-nodes`可控制筛选时是否显示搜索无关节点

:::demo

```vue
<template>
  <div>
    <el-input-number v-model="count" :min="0" />
    <el-button @click="handleRefresh()">刷新</el-button>
    <hr />
    <div style="display: flex">
      <ex-data-tree
        v-model="value"
        :data="options"
        value-key="id"
        type="checkbox"
        default-expand-all
        show-header
        filterable
        :show-irrelevant-nodes="showIrrelevantNodes"
        style="width:300px;height: 300px"
        @change="handleChange"
      >
        <template #header>
          <ex-radio-group
            v-model="showIrrelevantNodes"
            :options="[
              { label: '隐藏搜索无关节点', value: false },
              { label: '展示搜索无关节点', value: true }
            ]"
            button
            full
            size="mini"
          />
        </template>
      </ex-data-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showIrrelevantNodes: false,
      count: 2000,
      value: [],
      options: []
    };
  },
  mounted() {
    this.getList(this.count);
    console.log(this.options);
  },
  methods: {
    handleRefresh() {
      this.getList(this.count);
      const start = new Date();
      setTimeout(() => {
        const end = new Date();
        console.log(`渲染${this.count * 5}条数据用时：${end - start}`);
      });
    },
    handleChange() {
      console.log(this.value);
    },
    getList(size) {
      let mockList = [];
      for (let index = 0; index < size; index++) {
        // this.value.push(`${index}`)
        mockList.push({
          id: `${index}`,
          label: `${index}_row_${index}`,
          children: [
            {
              id: index + '_0',
              label: `row_${index}_0`
            },
            {
              id: index + '_1',
              label: `row_${index}_1`
            },
            {
              id: index + '_2',
              label: `row_${index}_2`,
              children: [
                {
                  id: index + '_2_1',
                  label: `row_${index}_2_0`
                }
              ]
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

### 父子不联选

`noRelationship`表示父子不联选，但可通过双击父级的方式联动选择子级，`disabled-method`是可配置禁用对应节点是否被禁用

:::demo

```vue
<template>
  <div>
    <ex-data-tree
      v-model="value"
      :data="options"
      value-key="id"
      type="checkbox"
      filterable
      show-header
      header-title="全部（双击可联选）"
      select-all
      noRelationship
      :disabled-method="(option) => !!option.disable"
      style="width:200px;height: 300px"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: []
    };
  },
  mounted() {
    this.options = this.getList(1000);
  },
  methods: {
    handleChange() {
      console.log(this.value);
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: `${index}`,
          label: `row_${index}`,
          disable: index % 2,
          children: [
            {
              id: index + '_0',
              label: `row_${index}_0`
            },
            {
              id: index + '_1',
              label: `row_${index}_1`
            },
            {
              id: index + '_2',
              label: `row_${index}_2`,
              children: [
                {
                  id: index + '_2_1',
                  label: `row_${index}_2_0`
                }
              ]
            }
          ]
        });
      }
      return mockList;
    }
  }
};
</script>
```

:::

### 仅子联选

`child-relationship`表示仅子级联选，即父级可单独选择，但子级的选择会联动父级也必须被选中

:::demo

```vue
<template>
  <div>
    <ex-data-tree
      v-model="value"
      :data="options"
      value-key="id"
      type="checkbox"
      filterable
      show-header
      header-title="全部（双击可联选）"
      select-all
      child-relationship
      style="width:200px;height: 300px"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: []
    };
  },
  mounted() {
    this.options = this.getList(1000);
  },
  methods: {
    handleChange() {
      console.log(this.value);
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: `${index}`,
          label: `row_${index}`,
          children: [
            {
              id: index + '_0',
              label: `row_${index}_0`
            },
            {
              id: index + '_1',
              label: `row_${index}_1`
            },
            {
              id: index + '_2',
              label: `row_${index}_2`,
              children: [
                {
                  id: index + '_2_1',
                  label: `row_${index}_2_0`
                }
              ]
            }
          ]
        });
      }
      return mockList;
    }
  }
};
</script>
```

:::

### 自定义内容

筛选默认会以`label-key`作为字段搜索，除了通过配置`filter-method`自定义筛选的结果，还可通过`filter-keys`自定义筛选的字段，`highlightFilter`是默认设置的高亮筛选结果，但设置该属性时不支持使用插槽自定义内容，但可通过`label-html`方式配置自定义内容，`filter-color`可更改高亮的颜色。

:::demo

```vue
<template>
  <div>
    <ex-data-tree
      v-model="value"
      :data="options"
      value-key="id"
      :filter-keys="['id', 'label']"
      label-html="${id}+${label}"
      type="checkbox"
      filterable
      filter-color="yellow"
      style="width:200px;height: 300px"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: []
    };
  },
  mounted() {
    this.options = this.getList(1000);
  },
  methods: {
    handleChange() {
      console.log(this.value);
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: `id_${index}`,
          label: `row_${index}`,
          children: [
            {
              id: 'id_' + index + '_0',
              label: `row_${index}_0`
            },
            {
              id: 'id_' + index + '_1',
              label: `row_${index}_1`
            },
            {
              id: 'id_' + index + '_2',
              label: `row_${index}_2`,
              children: [
                {
                  id: 'id_' + index + '_2_1',
                  label: `row_${index}_2_0`
                }
              ]
            }
          ]
        });
      }
      return mockList;
    }
  }
};
</script>
```

:::

### 自定义内容插槽

不得已要使用插槽自定义显示的内容时，需要将高亮显示的`highlight-filter`关闭，使用默认插槽便可。

:::demo

```vue
<template>
  <div>
    <ex-data-tree
      v-model="value"
      :data="options"
      value-key="id"
      :highlight-filter="false"
      type="checkbox"
      filterable
      style="width:200px;height: 300px"
      @change="handleChange"
    >
      <template #default="{ node }"> ({{ node.label }}) </template>
    </ex-data-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: []
    };
  },
  mounted() {
    this.options = this.getList(1000);
  },
  methods: {
    handleChange() {
      console.log(this.value);
    },
    getList(size) {
      const mockList = [];
      for (let index = 0; index < size; index++) {
        mockList.push({
          id: `id_${index}`,
          label: `row_${index}`,
          children: [
            {
              id: 'id_' + index + '_0',
              label: `row_${index}_0`
            },
            {
              id: 'id_' + index + '_1',
              label: `row_${index}_1`
            },
            {
              id: 'id_' + index + '_2',
              label: `row_${index}_2`,
              children: [
                {
                  id: 'id_' + index + '_2_1',
                  label: `row_${index}_2_0`
                }
              ]
            }
          ]
        });
      }
      return mockList;
    }
  }
};
</script>
```

:::

### Attributes

| 参数                     | 说明                                                                                                                             | 类型                            | 可选值           | 默认值   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------- | -------- |
| type                     | 树的类型，checkbox：多选，radio：单选                                                                                            | String                          | checkbox/radio   | —        |
| value                    | 绑定值                                                                                                                           | —                               | —                | —        |
| check-strategy           | 复选时指定勾选回调返回的值，parent:包括父级；child:仅含子级；all: 包含半选                                                       | String                          | parent/child/all | parent   |
| loading                  | 加载                                                                                                                             | Boolean                         | —                | —        |
| data                     | 数据，支持通过.sync 绑定代理请求后的数据                                                                                         | Array                           | —                | —        |
| label-key                | 定义 label 字段                                                                                                                  | String                          | —                | label    |
| value-key                | 定义 value 字段                                                                                                                  | String                          | —                | value    |
| child-key                | 子级字段                                                                                                                         | String                          | —                | children |
| deep                     | 是否启用深拷贝，当 data 用于多个树渲染时需要启用，深拷贝下 data 与用于渲染树的数据互不影响，但数据量过大时将影响性能             | Boolean                         | —                | false    |
| show-select-icon         | 是否显示选择图标                                                                                                                 | Boolean                         | —                | true     |
| highlight-current        | 是否高亮当前选中节点                                                                                                             | Boolean                         | —                | true     |
| cancelable               | 单选框下，选中之后是否允许取消                                                                                                   | Boolean                         | —                | false    |
| check-on-click-node      | 是否在点击节点的时候选中节点，false 时只有在点击选框时才会选中节点                                                               | Boolean                         | —                | true     |
| expand-on-click          | 树非可选类型或 check-on-click-node 为 false 时，控制在点击节点后是否展开或收缩节点                                               | Boolean                         | —                | true     |
| default-expand-all       | 是否默认展开的所有节点                                                                                                           | Boolean                         | —                | false    |
| default-expanded-keys    | 默认展开项                                                                                                                       | Array                           | —                | []       |
| accordion                | 是否使用手风琴展开模式                                                                                                           | Boolean                         | —                | false    |
| no-relationship          | 复选框的情况下，是否遵循父子不互相关联的做法                                                                                     | Boolean                         | —                | false    |
| child-relationship       | 复选框的情况下，是否只遵循子关联，即复选框的情况下，是否遵循子关联，而父不关联的做法                                             | Boolean                         | —                | false    |
| show-header              | 是否显示头部                                                                                                                     | Boolean                         | —                | false    |
| header-title             | 头部标题信息显示文本                                                                                                             | String                          | —                | 全部     |
| select-all               | 复选框的情况下，是否在头部显示全选框                                                                                             | Boolean                         | —                | true     |
| expand-all               | 是否在筛选框或头部显示展开全部按钮                                                                                               | Boolean                         | —                | true     |
| filterable               | 是否可搜索                                                                                                                       | Boolean                         | —                | false    |
| filter-tip               | 搜索输入框的提示语                                                                                                               | String                          | —                | 搜索     |
| filter-method            | 自定义筛选方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏                                                | Function(node)                  | —                | —        |
| filter-keys              | 筛选目标的字段组，没有时选择 label-key                                                                                           | Array                           | —                | —        |
| highlight-filter         | 是否高亮筛选内容，注意：使用时无法使用自定义内容插槽，可使用 label-html 替换                                                     | Boolean                         | —                | true     |
| label-html               | 自定义显示节点内容，使用${}拼接字段，支持html格式，如'我叫${name}性别${sex}'                                                     | String                          | —                | —        |
| filter-color             | 筛选高亮的颜色                                                                                                                   | String                          | —                | #f22b2b  |
| show-irrelevant-nodes    | 是否显示搜索无关节点                                                                                                             | Boolean                         | —                | false    |
| disabled-method          | 禁用选项的方法,返回是否禁用                                                                                                      | Function(node)                  | —                | —        |
| gt                       | 开启虚拟滚动时的最大行数                                                                                                         | number                          | —                | 100      |
| indent                   | 相邻级节点间的水平缩进，单位为像素                                                                                               | number                          | —                | 18       |
| request-config           | 请求代理配置                                                                                                                     | object                          | —                | —        |
| request-config.api       | 获取选项的 api 请求方法                                                                                                          | async function                  | —                | —        |
| request-config.params    | 定义请求的参数                                                                                                                   | any                             | —                | —        |
| request-config.result    | 请求返回的选项对象路径，参考[Lodash：get](https://lodash.com/docs/4.17.15#get)函数的 path 参数，也可使用函数进行自定义返回的选项 | string\|function({status,data}) | —                | —        |
| request-config.immediate | 是否在初始化时请求数据                                                                                                           | boolean                         | —                | true     |
| resizable                | 是否启用大小调节                                                                                                                 | Boolean                         | —                | true     |
| offset                   | 收起时按钮的偏移量                                                                                                               | number                          | —                | 0        |
| max-width                | 拖拽的最大宽度                                                                                                                   | String                          | —                | none     |
| min-width                | 拖拽的最小宽度                                                                                                                   | String                          | —                | 150px    |

### Events

| 事件名称           | 说明                                       | 回调参数        |
| ------------------ | ------------------------------------------ | --------------- |
| change             | 绑定值发生变化时触发                       | (value,node)    |
| update:data        | 用于代理请求 data 后，设置 data 绑定值返回 | (data)          |
| expand-node-change | 点击节点展开/收起时的触发事件              | (expanded,node) |

### Slots

插槽的 name 可通过属性 slots 重命名

| name    | 说明                                                                  | 参数                               |
| ------- | --------------------------------------------------------------------- | ---------------------------------- |
| default | 节点内容，但与 highlight-filter 属性冲突，需要其设置为 false 才能生效 | {node,selected,filterText,allData} |
| header  | 位于组件头部内容与搜索框之间                                          |                                    |
| empty   | 无选项时的列表                                                        |                                    |
| title   | 树头部标题内容                                                        |                                    |

### Methods

| 方法名             | 说明                               | 参数                                |
| ------------------ | ---------------------------------- | ----------------------------------- |
| focus              | 使搜索框获取焦点                   | -                                   |
| blur               | 使搜索框失去焦点                   | —                                   |
| select             | 选中搜索框中的文字                 |                                     |
| commitRequest      | 手动发起代理请求                   | —                                   |
| setAllTreeSelect   | 设置全选                           | isExpand                            |
| setAllTreeExpand   | 设置展开                           | isSelectAll                         |
| getCheckedData     | 获取选中的数据                     | (checkStrategy)=>{value,data}       |
| setNodeSelectByKey | 根据节点的绑定值手动当前树节点选择 | (key, isSelect, relate = false)=>{} |
