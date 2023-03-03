import Input from './src/input.vue';

Input.install = (Vue) => {
  Vue.components(Input.name, Input);
};

export const ExInput = Input;

export default ExInput;
