# 使用

使用 ex-design 组件时，请务必保证项目中已导入该组件二次封装的对应第三方库（element-ui 或 vxe-table）的组件，以减少项目的重复打包资源。

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
