/**
 * 数值转化为固定倍步数倍值
 * @param {number} value 数值
 * @param {number} step 步数
 */
export function formatStep(value, step) {
  if (!value || isNaN(value)) {
    return value;
  }
  if (!step) {
    return value;
  }
  const valueString = value.toString();
  const dotPosition = valueString.indexOf('.');
  let precision = 0;
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1;
  }
  const precisionFactor = Math.pow(10, precision);
  value = (Math.round(value / step) * precisionFactor * step) / precisionFactor;
  return value;
}

/**
 * 精确到precision位小数
 * @param {number} value 数值
 * @param {number} precision 小数精度
 */
export function formatRound(value, precision) {
  if (value === '' || value === null) {
    return value;
  }
  if (isNaN(value)) {
    return value;
  }
  // 数字且精度大于等于0时，才做四舍五入精确操作
  precision = Number(precision);
  if (precision >= 0) {
    return Math.round(Number(value) * Math.pow(10, precision)) / Math.pow(10, precision);
  }
  return Number(value);
}

/**
 * 金额格式化（千分符）
 * @param {number} amount 金额
 * @param {number} precision 小数精度（默认保留两位小数）
 */
export function formatAmount(amount, precision) {
  let roundAmount = formatRound(amount, precision);
  if (typeof roundAmount !== 'number') {
    return roundAmount;
  } else {
    roundAmount = roundAmount.toString();
  }
  let decimalPos = roundAmount.indexOf('.');
  // 没有小数点补充小数点
  if (decimalPos < 0) {
    decimalPos = roundAmount.length;
    roundAmount += '.';
  }
  if (!Number(precision)) {
    precision = 0;
  }
  // 不够小数位补0
  while (roundAmount.length <= decimalPos + Number(precision)) {
    roundAmount += '0';
  }
  roundAmount = roundAmount.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  // 去掉末尾小数点
  if (roundAmount[roundAmount.length - 1] === '.') {
    return roundAmount.slice(0, -1);
  }
  return roundAmount;
}

/** 百分比转化 */
export function formatPercent(value, percent) {
  const val = formatRound(value * 100, percent);
  if (typeof val === 'number') {
    return val + '%';
  }
  return value;
}
