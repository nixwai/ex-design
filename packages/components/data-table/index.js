import DataTable from './src/data-table.vue';

DataTable.install = function (Vue) {
  Vue.component(DataTable.name, DataTable);
};

export const ExDataTable = DataTable;

export default DataTable;
