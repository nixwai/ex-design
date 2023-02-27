import { defineConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import nav from './configs/nav'
import sidebar from './configs/sidebar';

export default defineConfig({
  title: "ex-design", // 网站标题
  description: "基于element ui与vxe-table封装的ui组件库", // 网站描述
  dest: "./dist", // 打包目录
  themeConfig: {
    nav,
    sidebar
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => {
      md.use(demoBlockPlugin)
    }
  }
});
