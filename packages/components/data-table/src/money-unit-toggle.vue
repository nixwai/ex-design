<template>
  <vxe-button circle title="切换单位" style="padding: 0; font-size: 12px" @click="handleChangeUnit">
    {{ isYuanUnit ? '元' : '万元' }}
  </vxe-button>
</template>

<script>
export default {
  name: 'MoneyUnitToggle'
};
</script>

<script setup>
const props = defineProps({
  isYuanUnit: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['unit-change', 'update:isYuanUnit']);

function handleChangeUnit() {
  changeColumnsUnit(props.columns);
  emit('update:isYuanUnit', !props.isYuanUnit);
  emit('unit-change', !props.isYuanUnit);
}

/** 切换列头的单位 */
function changeColumnsUnit(columns) {
  const [unit1, unit2] = props.isYuanUnit ? ['元', '万元'] : ['万元', '元'];
  columns.forEach((column) => {
    if (column.isMoney && column.title) {
      column.title = column.title.replace(unit1, unit2);
    }
    if (column.children) {
      changeColumnsUnit(column.children);
    }
  });
}
</script>
