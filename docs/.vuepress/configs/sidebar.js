module.exports = [
  {
    title: '快速开始',
    collapsable: false,
    children: [
      ['/guide/install', '安装'],
      ['/guide/usage', '使用']
    ]
  },
  {
    title: '组件',
    collapsable: false,
    children: [
      {
        title: 'Layout',
        collapsable: false,
        children: ['/components/grid', '/components/resize-content']
      },
      {
        title: 'Basic',
        collapsable: false,
        children: ['/components/button', '/components/overflow-tip']
      },
      {
        title: 'Form',
        collapsable: false,
        children: [
          '/components/input',
          '/components/edit-number',
          '/components/select',
          '/components/more-select',
          '/components/tree-select',
          '/components/radio-group',
          '/components/checkbox-group',
          '/components/cascader',
          '/components/edit-item'
        ]
      },
      {
        title: 'Tree',
        collapsable: false,
        children: ['/components/data-tree']
      },
      {
        title: 'Table',
        collapsable: false,
        children: ['/components/data-table']
      }
    ]
  }
];
