import { watch } from 'vue';
import { setup } from 'vxe-table';

/** 列配置 */
export function useColumns(props = { columns: [] }) {
  /** vxe的全局配置 */
  const vxeGlobalConfig = setup();

  watch(
    () => props.columns,
    () => {
      setupDefaultConfig(props.columns);
      setupColumns(props.columns);
    },
    { immediate: true }
  );

  /** 设置列表默认配置 */
  function setupDefaultConfig(columns) {
    if (['checkbox', 'radio', 'seq', 'expand'].includes(columns?.[0].type)) {
      const column = columns[0];
      column.minWidth = column.minWidth ?? '65px';
      column.width = column.width ?? '65px';
      column.align = column.align ?? 'center';
      column.fixed = column.fixed ?? 'left';
    }
  }

  /** 设置列配置 */
  function setupColumns(columns) {
    columns.forEach((column, columnIndex) => {
      setupColumnConfig(column, columnIndex);
      if (column.children) {
        setupColumns(column.children);
      }
    });
  }

  /** 设置列配置 */
  function setupColumnConfig(column, columnIndex) {
    // 将金额格式配置到列中
    if (column.isMoney) {
      setupConfig('moneyConfig', column, columnIndex);
    }
    // 将批量格式设置列中
    setupConfig('columnsConfig', column, columnIndex);
  }

  /** 批量设置列配置 */
  function setupConfig(configName, column, columnIndex) {
    const columnConfig = {};
    overlayColumnConfig(columnConfig, vxeGlobalConfig?.table?.[configName], {
      column,
      columnIndex
    });
    overlayColumnConfig(columnConfig, props[configName], {
      column,
      columnIndex
    });
    for (const key in columnConfig) {
      column[key] = column[key] ?? columnConfig[key];
    }
  }
}

/** 叠加列配置 */
function overlayColumnConfig(columnConfig, newConfig, params) {
  const configType = typeof newConfig;
  if (configType === 'function') {
    Object.assign(columnConfig, newConfig(params));
  } else if (configType === 'object') {
    Object.assign(columnConfig, newConfig);
  }
}
