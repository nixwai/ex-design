import { ExCard } from './components/Card';

const ExComponents = [ExCard];

// 全局引入时使用
export const installer = (Vue) => {
  ExComponents.forEach((comp) => {
    Vue.component(comp.name, comp);
  });
};
