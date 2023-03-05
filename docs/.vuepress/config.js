const nav = require('./configs/nav');
const sidebar = require('./configs/sidebar');

module.exports = {
  title: 'ExDesign',
  description: '基于element-ui、vxe-table3.x组件库进行功能扩展,提供更接近业务场景的组件',
  plugins: ['demo-container'],
  themeConfig: {
    nav,
    sidebar
  },
  chainWebpack(config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  }
};
