import VirtualList from './src/virtual-list.vue';

VirtualList.install = function (Vue) {
  Vue.component(VirtualList.name, VirtualList);
};

export const EXVirtualList = VirtualList;

export default EXVirtualList;
