import EditNumber from './src/edit-number.vue';

EditNumber.install = (Vue) => {
  Vue.components(EditNumber.name, EditNumber);
};

export const ExEditNumber = EditNumber;

export default EditNumber;
