import EditItem from './src/edit-item.vue';

EditItem.install = (Vue) => {
  Vue.components(EditItem.name, EditItem);
};

export const ExEditItem = EditItem;

export { setEditComponent } from './src/componentMap';

export default EditItem;
