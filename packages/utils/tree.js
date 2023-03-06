import { cloneDeep } from 'lodash-es';

/**
 * 树结构转数组（浅拷贝）
 * @param {array} tree 数据
 * @param {string} childKey 子节点名
 * @param {boolean} addProps 是否补充标识属性(默认false)
 * @param {boolean} deep 是否深拷贝数据(默认false)，大数量深拷贝会影响性能，慎选
 * @props {_INDEX:位置下标,_LEVEL:层级,_KEY:唯一key,_LEAF:是否为叶子节点,_PARENT:父级key}
 *  */
export function toTreeArray(tree, childKey, addProps = false, deep = false) {
  return transformTreeToArray({
    tree: deep ? cloneDeep(tree) : tree,
    childKey,
    addProps
  });
}

function transformTreeToArray({
  tree,
  childKey,
  addProps,
  list = [],
  parentKey = null,
  level = 1
}) {
  if (!Array.isArray(tree)) {
    return list;
  }
  let index = list.length;
  tree.forEach((item) => {
    const key = `Row_${index}`;
    if (addProps) {
      item._KEY = key;
      item._INDEX = index;
      item._LEVEL = level;
      item._LEAF = !item[childKey]?.length;
      item._PARENT = parentKey;
    }
    list.push(item);
    index++;
    if (childKey && item[childKey]) {
      transformTreeToArray({
        tree: item[childKey],
        childKey,
        addProps,
        list,
        parentKey: key,
        level: level + 1
      });
      index = list.length;
    }
  });
  return list;
}

/**
 * 筛选树结构的数组
 * @param {array} list 数据
 * @param {string} childKey 子节点名
 * @param {function} filterMethod 筛选函数: (item)=>boolean
 * @param {boolean} init 是否仅初始化筛选状态
 *  */
export function filterTreeArray(list, childKey, filterMethod, init = false) {
  if (!Array.isArray(list)) {
    return;
  }
  if (init) {
    list.forEach((item) => {
      item._FILTER = false;
      item._FILTER_RELATE = true;
      item._IS_CHILD_FILTER = false;
    });
    return;
  }
  for (let i = list.length - 1; i >= 0; i--) {
    const node = list[i];
    const filterRes = !!filterMethod(node);
    node._FILTER = filterRes; // 是否符合筛选结果
    node._FILTER_RELATE = filterRes; // 是否与筛选有关
    node._IS_CHILD_FILTER = false; // 子级是否有筛选
    if (Array.isArray(node[childKey])) {
      node[childKey].forEach((child) => {
        if (child._FILTER || child._IS_CHILD_FILTER) {
          node._IS_CHILD_FILTER = true;
        }
        if (child._FILTER_RELATE) {
          // 子节点筛选有关时，父节点也有关
          node._FILTER_RELATE = true;
        } else if (filterRes) {
          // 父节点筛选有关时，子级及以下筛选也有关
          child._FILTER_RELATE = true;
          if (child[childKey]) {
            setChildRelate(child[childKey], childKey);
          }
        }
      });
    }
  }
}

/** 设置子级的筛选为有关 */
function setChildRelate(list, childKey) {
  list.forEach((item) => {
    if (!item._FILTER_RELATE) {
      item._FILTER_RELATE = true;
      if (item[childKey]) {
        setChildRelate(item[childKey], childKey);
      }
    }
  });
}

/**
 * 筛选树（深拷贝）
 * @param {array} tree 数据
 * @param {string} childKey 子节点名
 * @param {function} filterMethod 筛选函数: (item)=>boolean
 * @param {boolean} onlyLeaf 是否仅筛选子节点 (默认true)
 *  */
export function filterTree(tree, childKey, filterMethod, onlyLeaf = true) {
  if (!Array.isArray(tree)) {
    return [];
  }
  const list = [];
  tree.forEach((item) => {
    const hasChild = !!item[childKey];
    if (!(hasChild && onlyLeaf) && filterMethod(item)) {
      const data = cloneDeep(item);
      list.push(data);
      if (hasChild) {
        return;
      }
    }
    if (hasChild) {
      const children = filterTree(item[childKey], childKey, filterMethod, onlyLeaf);
      if (children.length) {
        const data = cloneDeep({ ...item, [childKey]: undefined });
        data[childKey] = children;
        list.push(data);
      }
    }
  });
  return list;
}
