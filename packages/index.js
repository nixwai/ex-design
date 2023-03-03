import { ExButton } from './components/button';
import { ExDataTree } from './components/data-tree';
import { ExGrid, ExGi } from './components/grid';
import { ExMoreSelect } from './components/more-select';
import { ExOverflowTip } from './components/overflow-tip';
import { ExRadioGroup } from './components/radio-group';
import { ExResizeContent } from './components/resize-content';
import { ExSelect } from './components/select';

const ExComponents = [
  ExButton,
  ExDataTree,
  ExGi,
  ExGrid,
  ExMoreSelect,
  ExOverflowTip,
  ExRadioGroup,
  ExResizeContent,
  ExSelect
];

export {
  ExButton,
  ExDataTree,
  ExGi,
  ExGrid,
  ExMoreSelect,
  ExOverflowTip,
  ExRadioGroup,
  ExResizeContent,
  ExSelect
};

const install = (Vue) => {
  ExComponents.forEach((comp) => {
    Vue.component(comp.name, comp);
  });
};

export default {
  install
};
