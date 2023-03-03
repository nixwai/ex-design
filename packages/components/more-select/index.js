import MoreSelect from './src/more-select.vue';

MoreSelect.install = (Vue) => {
  Vue.components(MoreSelect.name, MoreSelect);
};

export const ExMoreSelect = MoreSelect;

export default ExMoreSelect;
