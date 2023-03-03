import { computed, watch } from 'vue';

/** 合计统计 */
export function useTotal({ props, sourceData, formatCellValue }) {
  /** 保存合计列的值和计算方式 */
  let totalColumns = {};

  watch(
    () => props.columns,
    () => {
      if (props.footerMethod) {
        return;
      }
      totalColumns = {};
      setTotalMap(props.columns);
    },
    { immediate: true }
  );

  function setTotalMap(columns) {
    columns.forEach((column) => {
      if (column.children?.length) {
        setTotalMap(column.children);
      } else if (column.field && column.total) {
        totalColumns[column.field] = {
          value: 0,
          mode: column.total
        };
      }
    });
  }

  watch(
    sourceData,
    () => {
      if (!sourceData.value.length) {
        return;
      }
      for (const key in totalColumns) {
        totalColumns[key].value = 0;
      }
      countTotalData();
    },
    { immediate: true }
  );

  /** 计算列的合计值 */
  function countTotalData() {
    const totalKeys = Object.keys(totalColumns);
    if (!totalKeys.length) {
      return;
    }
    sourceData.value.forEach((item) => {
      totalKeys.forEach((key) => {
        const totalObj = totalColumns[key];
        if (!totalObj) {
          return;
        }
        if (totalObj.mode === 'parent' && item._PARENT !== null) {
          return;
        }
        if (typeof totalObj.mode === 'function') {
          return;
        }
        const val = totalObj.value + Number(isNaN(item[key]) ? 0 : item[key]);
        totalObj.value = Math.round(val * Math.pow(10, 6)) / Math.pow(10, 6);
      });
    });
  }

  /** 是否显示统计的表尾 */
  const tableShowFooter = computed(() => {
    return !!(Object.keys(totalColumns).length || props.showFooter);
  });

  /** 表尾合计行数据获取方法 */
  function tableFooterMethod(options) {
    const { data, columns } = options;
    if (!data.length) {
      return [];
    }
    if (props.footerMethod) {
      return props.footerMethod(options);
    }
    if (!Object.keys(totalColumns).length) {
      return [];
    }
    const totalList = new Array(columns.length);
    totalList[0] = '合计';
    columns.forEach((column, index) => {
      const field = column.field;
      const totalObj = totalColumns[field];
      if (totalObj) {
        // 转入为函数时，自定义合计值
        if (typeof totalObj.mode === 'function') {
          totalList[index] = totalObj.mode({
            columns,
            column,
            columnIndex: index,
            totalColumns
          });
        } else {
          totalList[index] = totalObj.value;
        }
        if (formatCellValue) {
          totalList[index] = formatCellValue({
            cellValue: totalList[index],
            field: column.field,
            runSource: false,
            runGlobal: false
          });
        }
      }
    });
    return [totalList];
  }

  return {
    tableShowFooter,
    tableFooterMethod
  };
}
