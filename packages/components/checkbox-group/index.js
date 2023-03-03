import CheckboxGroup from './src/checkbox-group.vue';

CheckboxGroup.install = function (Vue) {
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

export const ExCheckboxGroup = CheckboxGroup;

export default CheckboxGroup;
