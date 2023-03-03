import ExDesign from 'ex-design';
import ElementUI from 'element-ui';
import VXETable from 'vxe-table';
import 'element-ui/lib/theme-chalk/index.css';
import 'vxe-table/lib/style.css';

export default ({ Vue }) => {
  Vue.use(ExDesign);
  Vue.use(ElementUI);
  Vue.use(VXETable);
};
