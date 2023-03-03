# DataTable 数据表格

基于[vxe-grid](https://vxetable.cn/v3/#/table/grid/basic)高级表格封装的表格组件。

vxe-grid 本身就已拥有丰富的表格功能，这个组件主要在此表格组件上进行功能扩展，同时保留了原有的相关 API，故不在此重复，了解原组件相关文档请查看[vxe-grid API 文档](https://vxetable.cn/v3/#/grid/api)。

当前已扩展功能：**支持树型结构数据虚拟滚动**、**工具栏新增树的全展开/收起按钮**、**工具栏新增元/万元的金额切换按钮**、**批量设置列配置**、**列数据合计统计配置**、**列数据金额格式转化**、**列空数据时显示值**、**列数据千分符格式转化**、**列数据日期格式转化**、**列数据百分比格式转化**、**api 请求代理**。

:::tip

在扩展功能时，部分原组件配置的默认值也会有所更改，如：表格第一列 type 为'checkbox', 'radio', 'seq', 'expand'时，会配置默认 width、align、fixed，使用时便可不必重复配置。

使用时请仔细查看以下**更改的属性**与**扩展功能的新增属性**配置

:::

有关**继承 setup**的内容可查看[vxe 全局参数](https://vxetable.cn/v3/#/table/start/global)

:::warning
注意：对于获取 vxe-grid 的方法无法直接获取，需要先通过`getDom`方法获取组件内 vxe-grid 的实例，再使用其内部方法
:::

### 原组件更改的属性

| 参数                        | 说明                                                                                                                                                                                                                                                                           | 类型                                | 默认值      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ----------- |
| toolbarConfig.slots.buttons | 表格头部左侧按钮插槽名                                                                                                                                                                                                                                                         | string                              | tableHeader |
| toolbarConfig.slots.buttons | 表格头部右侧工具栏插槽名                                                                                                                                                                                                                                                       | string                              | tableTool   |
| treeConfig.transform        | 自动将列表转为树结构（支持虚拟滚动）<br />⚠️ 为支持树结构或列表结构数据保持虚拟滚动，该字段将保持为 true，不再支持修改                                                                                                                                                         | boolean                             | true        |
| treeConfig.rowField         | 树节点的字段名（现默认自动生成）                                                                                                                                                                                                                                               | string                              | \_KEY       |
| treeConfig.parentField      | 树父节点的字段名（现默认自动生成）                                                                                                                                                                                                                                             | string                              | \_PARENT    |
| treeConfig.children         | 配置树子节点的字段名                                                                                                                                                                                                                                                           | string                              | children    |
| column.formatter            | 格式化显示内容，格式化执行的顺序为 column.formatter>空值判断处理>金额单位处理>列配置格式化>全局配置 setup.table.formatter<br />⚠️ 格式化仅会对需要渲染的值进行转化，转化后的值会保存在数据的`_row_${field}`中，如果需要获取未渲染的格式化后的值可使用`formatCellValue`方法获取 | ({ cellValue, row, column }) => any |             |

### 扩展功能的新增属性

| 参数                    | 说明                                                                                                                             | 类型                                                                         | 默认值                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------ |
| toolbarConfig.expandAll | 是否在工具栏显示全部展开/收起按钮                                                                                                | boolean                                                                      | false                          |
| toolbarConfig.moneyUnit | 是否在工具栏显示元/万元金额单位切换按钮，对 isMoney 为 true 的列进行切换，切换时会重置列状态                                     | boolean                                                                      | false                          |
| columnsConfig           | 与原组件`columnConfig`不同，该属性是批量配置 column 的默认值，因此参数与 column 一致，并支持函数形式动态配置                     | column\|({column, columnIndex})=>column                                      | 继承 setup.table.columnsConfig |
| moneyConfig             | 配置列的金额格式，该属性也是批量配置 column 的默认值，不过仅当 column.isMoney 为 true 时生效，优先级高于 columnsConfig           | column\|({column, columnIndex})=>column                                      | 继承 setup.table.moneyConfig   |
| column.empty            | 为空时的显示值                                                                                                                   | string                                                                       | —                              |
| column.isMoney          | 是否为金额格式，金额的格式由 moneyConfig 决定                                                                                    | boolean                                                                      | false                          |
| column.thousands        | 转化为保留 n 位小数的千分符格式，n 为 thousands 的值，小于 0 表示                                                                | number                                                                       | —                              |
| column.date             | 将时间或数字类型值转化为对应日期格式                                                                                             | string(日期格式)                                                             | —                              |
| column.percent          | 转化为保留 n 位小数的百分比格式                                                                                                  | number                                                                       | —                              |
| column.total            | 计算合计值并添加在表尾合计行中，’parent‘时为仅计算表格最上级合计，也可传入函数进行自定义合计值                                   | boolean\|'parent'\|({columns,column,<br />columnIndex,totalColumns})=>string | —                              |
| requestConfig           | 请求代理配置                                                                                                                     | object                                                                       | —                              |
| requestConfig.api       | 获取选项的 api 请求方法                                                                                                          | async function                                                               | —                              |
| requestConfig.params    | 定义请求的参数                                                                                                                   | any                                                                          | —                              |
| requestConfig.result    | 请求返回的选项对象路径，参考[Lodash：get](https://lodash.com/docs/4.17.15#get)函数的 path 参数，也可使用函数进行自定义返回的选项 | string\|function({status,data})                                              | —                              |
| requestConfig.immediate | 是否在初始化时请求数据                                                                                                           | boolean                                                                      | true                           |

### 扩展功能的新增事件

| 参数              | 说明                                                      | 参数                         |
| ----------------- | --------------------------------------------------------- | ---------------------------- |
| unit-change       | 金额单位切换时触发                                        | isYuanUnit（是否为‘元’单位） |
| expand-all-change | 展开/收起全部时触发                                       | isExpandAll（是否展开全部）  |
| select            | 只对 type=checkbox 有效，当手动勾选(包括全选)时触发的事件 | data                         |

### 方法

| 参数            | 说明                                                                                                                                                                                               | 参数/返回值                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| getDom          | 获取 vxe-grid 实例，用于调用使用原组件的方法                                                                                                                                                       | ()=>vxeGrid                                        |
| formatCellValue | 获取值在对应列格式化后的值，cellValue 为传入的值，field 为列绑定字段，row 为行数据(默认空对象)，runSource 为是否使用列的格式化方法(默认为 true)，runGlobal 为是否使用全局的格式化方法(默认为 true) | ({cellValue,field,row,runSource,runGlobal})=>value |
| commitRequest   | 提交选项获取请求                                                                                                                                                                                   | (params)=>({status,data})                          |

### 日期格式

仅展示部分常用格式，在 [这里](https://date-fns.org/v2.29.3/docs/format) 可查看更多 date-fns 支持的日期格式。

:::warning
请注意大小写
:::

| 格式   | 含义      | 备注              | 举例          |
| ------ | --------- | ----------------- | ------------- |
| `yyyy` | 年        |                   | 2017          |
| `M`    | 月        | 不补 0            | 1             |
| `MM`   | 月        |                   | 01            |
| `W`    | 周        | 不补 0            | 1             |
| `WW`   | 周        |                   | 01            |
| `d`    | 日        | 不补 0            | 2             |
| `dd`   | 日        |                   | 02            |
| `H`    | 小时      | 24 小时制；不补 0 | 3             |
| `HH`   | 小时      | 24 小时制         | 03            |
| `h`    | 小时      | 12 小时制；不补 0 | 3             |
| `hh`   | 小时      | 12 小时制         | 03            |
| `m`    | 分钟      | 不补 0            | 4             |
| `mm`   | 分钟      |                   | 04            |
| `s`    | 秒        | 不补 0            | 5             |
| `ss`   | 秒        |                   | 05            |
| `a`    | AM、PM    |                   | AM            |
| `aaa`  | am、pm    |                   | am            |
| `T`    | JS 时间戳 |                   | 1483326245000 |

### 基础用法

:::demo

```vue
<template>
  <ex-data-table
    id="demo"
    ref="tableRef"
    :data.sync="data"
    :columns="columns"
    :loading="loading"
    :tree-config="{}"
    :toolbar-config="{
      custom: true,
      zoom: true,
      expandAll: true,
      moneyUnit: true
    }"
    :columns-config="{ empty: '--' }"
    :money-config="{
      align: 'right',
      thousands: 2
    }"
    :request-config="{
      api: requestFn,
      params: size,
      result: 'data'
    }"
    :border="true"
    style="height: 500px"
  >
    <template #tableHeader>
      <el-button type="primary" size="mini" @click="getData()">刷新</el-button>
    </template>
    <template #tableTool>
      <el-button type="primary" size="mini" @click="getData(20)">20行</el-button>
      <el-button type="primary" size="mini" @click="getData(1000)" style="margin-right: 10px"
        >1k行</el-button
      >
    </template>
    <template #rowCount="{ row }">
      <div>{{ row.count ? row.count + '个' : '--' }}</div>
    </template>
  </ex-data-table>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      data: [],
      columns: [
        { type: 'seq' },
        {
          field: 'name',
          minWidth: '150px',
          title: '名称',
          treeNode: true
        },
        {
          field: 'date',
          minWidth: '150px',
          title: '时间',
          date: 'yyyy-MM-dd HH:mm'
        },
        {
          field: 'count',
          minWidth: '100px',
          title: '子级数量',
          total: 'parent',
          slots: {
            default: 'rowCount'
          }
        },
        {
          title: '财务',
          align: 'center',
          children: [
            {
              field: 'amount',
              minWidth: '150px',
              title: '总金额（元）',
              isMoney: true,
              total: true
            },
            {
              field: 'taxAmount',
              minWidth: '150px',
              title: '税额（元）',
              isMoney: true,
              total: true
            }
          ]
        },
        {
          field: 'taxPer',
          minWidth: '100px',
          title: '税率',
          align: 'right',
          percent: 2,
          total: ({ totalColumns }) => totalColumns.taxAmount.value / totalColumns.amount.value
        }
      ],
      size: 20
    };
  },
  methods: {
    async getData(size) {
      if (size) {
        this.size = size;
      }
      await this.$refs.tableRef.commitRequest();
      console.log(this.data);
    },
    // 模拟请求
    requestFn(size) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const list = [];
          for (let index = list.length; index < size; index++) {
            const amount = (size - index) * (index + 2);
            const count = (index % 4) + 1;
            const taxPer = count / 100;
            list.push({
              name: `row_${index}`,
              date: new Date(),
              amount: amount,
              count: count,
              taxAmount: amount * taxPer,
              taxPer: taxPer,
              children: new Array(count).fill().map((_, i) => ({
                name: `row_${index}_${i}`,
                amount: amount / (i + 2),
                taxAmount: (amount / (i + 2)) * taxPer,
                taxPer: taxPer
              }))
            });
          }
          resolve({
            data: list
          });
        }, 2000);
      });
    }
  }
};
</script>
```

:::
