import ResizeContent from './src/resize-content.vue';

ResizeContent.install = function (Vue) {
  Vue.component(ResizeContent.name, ResizeContent);
};

export const ExResizeContent = ResizeContent;

export default ExResizeContent;
