# ex-design

基于 element ui 与 vxe-table 封装的 ui 组件库

## 安装

### 使用 npm

```shell
npm install ex-design
```

### 使用 yarn

```shell
yarn add ex-design
```

### 使用 pnpm

```shell
pnpm add ex-design
```

## 使用

由于组件库使用的是 vue2.7 ，使用时请确保项目已经升级至最新的 vue2.7 版本。

为减少打包资源，组件库并未提供第三方库（element-ui 或 vxe-table）的组件引入，使用时请自行引入组件内对应的第三方组件。

#### 使用前需要 main.js 中引入样式

```js
import 'ex-design/lib/style.css';
```

### 直接引用

```vue
<template>
  <div>
    <ex-button>按钮</ex-button>
  </div>
</template>

<script>
import { ExButton } from 'ex-design';

export default {
  components: { ExCard }
};
</script>
```

### 全局引入

```js
import ExDesign from 'ex-design';

Vue.use(ExDesign);
```

### 按需引入

```js
import Vue from 'vue';
import { ExButton } from 'ex-design';

Vue.component(ExButton.name, ExButton);
/* 或写为
 * Vue.use(ExButton)
 */
```
