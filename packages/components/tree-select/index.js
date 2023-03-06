import TreeSelect from './src/tree-select.vue';

TreeSelect.install = function (Vue) {
  Vue.component(TreeSelect.name, TreeSelect);
};

export const ExTreeSelect = TreeSelect;

export default ExTreeSelect;
