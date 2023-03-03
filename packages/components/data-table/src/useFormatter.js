import { watch } from 'vue';
import { formatAmount, formatPercent } from '../../../utils/format';
import { formatDate } from '../../../utils/date';
import { setup } from 'vxe-table';

export function useFormatter(props = { columns: [] }, isYuanUnit) {
  /** 保存列格式转化方法 */
  const formatMap = new Map();
  /** vxe的全局配置 */
  const vxeGlobalConfig = setup();

  watch(
    () => props.columns,
    () => {
      formatMap.clear();
      setupColumns(props.columns);
    },
    { immediate: true }
  );

  /** 设置列配置 */
  function setupColumns(columns) {
    columns.forEach((column) => {
      if (!column.children) {
        setupColumnFormat(column);
      } else {
        setupColumns(column.children);
      }
    });
  }

  /** 全局格式化函数 */
  const globalFormat =
    typeof vxeGlobalConfig?.table?.formatter === 'function'
      ? vxeGlobalConfig.table.formatter
      : undefined;

  /** 设置值的格式化显示 */
  function setupColumnFormat(column) {
    if (!column.field) {
      return;
    }
    // 策略模式：根据配置生成对应格式化方法
    const formatActions = [
      // 千分符转化
      [
        !isBlank(column.thousands),
        (cellValue) => {
          return formatAmount(cellValue, column.thousands);
        }
      ],
      // 日期转化
      [
        !isBlank(column.date),
        (cellValue) => {
          return formatDate(cellValue, column.date);
        }
      ],
      // 百分比转化
      [
        !isBlank(column.percent),
        (cellValue) => {
          return formatPercent(cellValue, column.percent);
        }
      ],
      // 默认
      [true, (cellValue) => cellValue]
    ];
    const columnFormat = formatActions.find(([flag]) => flag)[1];
    // 保存原格式方法
    const sourceFormat = column.formatter;
    // 格式化方法
    const formatFn = getFormatFn(column, sourceFormat, columnFormat);
    formatMap.set(column.field, formatFn);
    column.formatter = formatter;
  }

  /** 格式化显示方法 */
  function formatter(options) {
    const field = options.column.field;
    const cellValue = formatCellValue({ cellValue: options.cellValue, field });
    // 格式化后的值保存在'_field'中
    options.row['_row_' + field] = cellValue;
    return cellValue;
  }

  /** 格式化值  */
  function formatCellValue({ cellValue, field, row = {}, runSource = true, runGlobal = true }) {
    const formatFn = formatMap.get(field);
    return formatFn ? formatFn({ cellValue, row, runSource, runGlobal }) : cellValue;
  }

  /** 获取格式化的方法 */
  function getFormatFn(column, sourceFormat, columnFormat) {
    return ({ cellValue, row, runSource, runGlobal }) => {
      // 自定义的格式转化
      if (runSource && sourceFormat) {
        if (typeof sourceFormat === 'function') {
          cellValue = sourceFormat?.({ cellValue, row, column });
        } else {
          cellValue = sourceFormat;
        }
      }
      // 空值处理
      if (isBlank(cellValue)) {
        return column.empty ?? cellValue;
      }
      // 元/万元切换
      const changeUnit = isYuanUnit.value === false && column.isMoney;
      if (changeUnit && cellValue && !isNaN(cellValue)) {
        cellValue = Math.round(cellValue * Math.pow(10, 4)) / Math.pow(10, 8);
      }
      // 列格式化转化
      cellValue = columnFormat(cellValue);
      // 全局格式化
      if (runGlobal && globalFormat) {
        cellValue = globalFormat({ cellValue, row, column });
      }
      return cellValue;
    };
  }

  return {
    formatCellValue
  };
}

/** 判断是否为空值（undefined, null, ''） */
function isBlank(val) {
  return [undefined, null, ''].includes(val);
}
