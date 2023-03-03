import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import VXETable from 'vxe-table';
import 'element-ui/lib/theme-chalk/index.css';
import 'vxe-table/lib/style.css';

Vue.use(ElementUI);
Vue.use(VXETable);

new Vue({
  render: (h) => h(App)
}).$mount('#app');
