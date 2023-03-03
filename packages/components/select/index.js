import Select from './src/select.vue';

Select.install = function (Vue) {
  Vue.component(Select.name, Select);
};

export const ExSelect = Select;

export default ExSelect;
