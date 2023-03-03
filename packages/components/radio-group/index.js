import RadioGroup from './src/radio-group.vue';

RadioGroup.install = function (Vue) {
  Vue.component(RadioGroup.name, RadioGroup);
};

export const ExRadioGroup = RadioGroup;

export default ExRadioGroup;
