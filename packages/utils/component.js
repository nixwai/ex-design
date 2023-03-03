/**
 * 获取实例需要暴露的函数
 * @param {ref} domRef dom实例
 * @param {array} fnKeys 函数列表
 * */
export function getRefExposeFn(domRef, fnKeys) {
  const fnObj = {};
  fnKeys.forEach((key) => {
    fnObj[key] = (...params) => domRef.value?.[key]?.(...params);
  });
  return fnObj;
}
