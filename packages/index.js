import { ExButton } from './components/button';

const ExComponents = [ExButton];

export { ExButton };

const install = (Vue) => {
  ExComponents.forEach((comp) => {
    Vue.component(comp.name, comp);
  });
};

export default {
  install
};
