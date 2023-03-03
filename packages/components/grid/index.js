import Grid from './src/grid.vue';
import Gi from './src/grid-item.vue';

Grid.install = (Vue) => {
  Vue.component(Grid.name, Grid);
};

Gi.install = (Vue) => {
  Vue.component(Gi.name, Gi);
};

export const ExGrid = Grid;
export const ExGi = Gi;
export default Grid;
