import ExDesign from '@ex-design/component';
import ElementUI from 'element-ui';
import VXETable from 'vxe-table';
import 'element-ui/lib/theme-chalk/index.css';
import 'vxe-table/lib/style.css';
import {
  ExInput,
  ExEditNumber,
  ExSelect,
  ExMoreSelect,
  ExRadioGroup,
  ExCheckboxGroup,
  ExCascader,
  setEditComponent
} from '@ex-design/component';

export default ({ Vue }) => {
  Vue.use(ExDesign);
  Vue.use(ElementUI);
  Vue.use(VXETable);
  setEditComponent([
    ['Input', ExInput],
    ['EditNumber', ExEditNumber],
    ['Select', ExSelect],
    ['MoreSelect', ExMoreSelect],
    ['RadioGroup', ExRadioGroup],
    ['CheckboxGroup', ExCheckboxGroup],
    ['Cascader', ExCascader]
  ]);
};
