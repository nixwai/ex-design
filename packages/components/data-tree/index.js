import DataTree from './src/data-tree.vue';

DataTree.install = (Vue) => {
  Vue.components(DataTree.name, DataTree);
};

export const ExDataTree = DataTree;

export default ExDataTree;
