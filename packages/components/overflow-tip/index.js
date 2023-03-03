import OverflowTip from './src/overflow-tip.vue';

OverflowTip.install = (Vue) => {
  Vue.components(OverflowTip.name, OverflowTip);
};

export const ExOverflowTip = OverflowTip;

export default ExOverflowTip;
