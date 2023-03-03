<script>
import { defineComponent, useListeners, computed, h } from 'vue';
import { componentMap } from './componentMap';

export default defineComponent({
  name: 'ExEditItem',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /** 动态组件名称或组件 */
    component: {
      type: [String, Object],
      default: undefined,
      required: true
    },
    /** input内容位置 */
    align: {
      type: String,
      default: undefined
    },
    /** 绑定数据更改时的回调函数集合 */
    on: {
      type: Object,
      default: () => ({})
    },
    /** 自定义插槽 */
    slots: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { attrs, slots }) {
    /** 编辑组件 */
    const editComponent = computed(() => {
      const comType = typeof props.component;
      // 直接传入组件方式
      if (comType === 'object') {
        return props.component;
      }
      // 使用内置组件方式
      if (comType === 'string') {
        const component = componentMap.get(props.component);
        if (component) {
          return component;
        }
        window.console.warn(`没有对应${props.component}内置组件,请确保给component属性传递有效值!`);
      }
      return 'div';
    });

    /** 默认插槽 */
    const slotObj = {};
    for (const key in slots) {
      slotObj[key] = key;
    }
    /** 自定义插槽 */
    const editSlots = Object.assign(slotObj, props.slots);

    /** 保存传入的on事件 */
    const onEvent = { ...props.on };
    /** 事件监听函数 */
    const eventListeners = getListeners();
    function getListeners() {
      const newListeners = {};
      const listeners = useListeners();
      for (const key in listeners) {
        // 事件触发同时执行on对象内函数
        if (typeof onEvent[key] === 'function') {
          newListeners[key] = (...params) => {
            onEvent[key](...params);
            listeners[key](...params);
          };
        } else {
          newListeners[key] = listeners[key];
        }
      }
      return newListeners;
    }
    return () =>
      h(editComponent.value, {
        ref: 'editRef',
        attrs: { ...attrs, align: props.align, slots: editSlots.value },
        on: eventListeners,
        scopedSlots: slots,
        // 控制input输入框内容位置
        class: { 'z-edit-align': !!props.align },
        style: { 'text-align': props.align }
      });
  },
  methods: {
    getDom() {
      return this.$refs.editRef;
    }
  }
});
</script>

<style scoped>
.z-edit-align >>> input {
  text-align: inherit;
}
</style>
