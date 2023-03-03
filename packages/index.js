import { ExButton } from './components/button';
import { ExCascader } from './components/cascader';
import { ExCheckboxGroup } from './components/checkbox-group';
import { ExDataTable } from './components/data-table';
import { ExDataTree } from './components/data-tree';
import { ExEditItem, setEditComponent } from './components/edit-item';
import { ExEditNumber } from './components/edit-number';
import { ExGrid, ExGi } from './components/grid';
import { ExInput } from './components/input';
import { ExMoreSelect } from './components/more-select';
import { ExOverflowTip } from './components/overflow-tip';
import { ExRadioGroup } from './components/radio-group';
import { ExResizeContent } from './components/resize-content';
import { ExSelect } from './components/select';

const ExComponents = [
  ExButton,
  ExCascader,
  ExCheckboxGroup,
  ExDataTable,
  ExDataTree,
  ExEditItem,
  ExEditNumber,
  ExGi,
  ExGrid,
  ExInput,
  ExMoreSelect,
  ExOverflowTip,
  ExRadioGroup,
  ExResizeContent,
  ExSelect
];

export {
  ExButton,
  ExCascader,
  ExCheckboxGroup,
  ExDataTable,
  ExDataTree,
  ExEditItem,
  ExEditNumber,
  ExGi,
  ExGrid,
  ExInput,
  ExMoreSelect,
  ExOverflowTip,
  ExRadioGroup,
  ExResizeContent,
  ExSelect,
  setEditComponent
};

const install = (Vue) => {
  ExComponents.forEach((comp) => {
    Vue.component(comp.name, comp);
  });
};

export default {
  install
};
