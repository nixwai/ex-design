import { ref, watch } from 'vue';

/** 树的展开控制 */
export function useTreeExpand(props, emit, treeRef) {
  /** 展开显示的树数据 */
  const expandData = ref([]);
  /** 是否展开全部 */
  const isExpandAll = ref(false);

  // 监听数据变化设置展开
  watch(
    () => props.data,
    () => {
      refreshTreeExpand();
    },
    { immediate: true }
  );

  /** 刷新树的展开 */
  function refreshTreeExpand() {
    const isExpand = props.defaultExpandAll;
    isExpandAll.value = isExpand;
    if (isExpand) {
      props.data.forEach((node) => {
        if (!node._LEAF) {
          node._EXPAND = true;
        }
        node._SHRINK = false;
      });
    } else {
      for (let i = props.data.length - 1; i >= 0; i--) {
        const node = props.data[i];
        node._SHRINK = node._LEVEL !== 1;
        if (!node._LEAF) {
          node._EXPAND = props.defaultExpandedKeys.includes(node[props.valueKey]);
          if (node._EXPAND) {
            node[props.childKey].forEach((item) => {
              item._SHRINK = false;
            });
          }
        }
      }
    }
    refreshTree();
    emit('expand-all-change', isExpandAll.value);
  }

  /** 切换展开/收起 */
  function toggleTreeExpand(node) {
    if (!node._LEAF) {
      const isExpand = !node._EXPAND;
      node._EXPAND = isExpand;
      setNodeShrink(node[props.childKey], isExpand);
      // 手风琴模式下，展开时收起其他节点
      if (isExpand && props.accordion) {
        const level = node._LEVEL;
        const index = node._INDEX;
        // 收起前兄弟节点
        for (let i = index - 1; i >= 0; i--) {
          const broNode = props.data[i];
          if (broNode._LEVEL < level) {
            break;
          }
          if (broNode._LEVEL !== level) {
            continue;
          }
          if (!broNode._LEAF) {
            broNode._EXPAND = false;
            setNodeShrink(broNode[props.childKey], false);
          }
        }
        // 收起后兄弟节点
        for (let i = index + 1; i < props.data.length; i++) {
          const broNode = props.data[i];
          if (broNode._LEVEL < level) {
            break;
          }
          if (broNode._LEVEL !== level) {
            continue;
          }
          if (!broNode._LEAF) {
            broNode._EXPAND = false;
            setNodeShrink(broNode[props.childKey], false);
          }
        }
      }
      refreshTree();
      emit('expand-node-change', isExpand, node);
    }
  }

  /** 设置节收起 */
  function setNodeShrink(nodeList, isExpand) {
    nodeList.forEach((item) => {
      item._SHRINK = !isExpand; // 是否收起状态
      if (!item._LEAF && item._EXPAND) {
        setNodeShrink(item[props.childKey], isExpand);
      }
    });
  }

  /** 展开/收起全部 */
  function setAllTreeExpand(isExpand) {
    isExpandAll.value = isExpand;
    props.data.forEach((node) => {
      if (!node._LEAF) {
        node._EXPAND = isExpand;
      }
      node._SHRINK = !isExpand && node._LEVEL !== 1;
    });
    refreshTree();
    treeRef.value?.refreshScroll();
    emit('expand-all-change', isExpandAll.value);
  }

  /** 刷新搜索展开内容 */
  function refreshFilterExpand() {
    isExpandAll.value = false;
    for (let i = props.data.length - 1; i >= 0; i--) {
      const node = props.data[i];
      node._SHRINK = node._LEVEL !== 1;
      if (!node._LEAF) {
        node._EXPAND = node._IS_CHILD_FILTER;
        if (node._EXPAND) {
          node[props.childKey].forEach((item) => {
            item._SHRINK = false;
          });
        }
      }
    }
    refreshTree();
    treeRef.value?.refreshScroll();
    emit('expand-all-change', false);
  }

  watch(
    () => props.showIrrelevantNodes,
    () => {
      refreshTree();
    }
  );

  /** 刷新树数据 */
  function refreshTree() {
    expandData.value = props.data.filter((node) => {
      node._VISUAL = props.showIrrelevantNodes ? true : node._FILTER_RELATE;
      return !node._SHRINK && node._VISUAL;
    });
  }

  return {
    expandData,
    isExpandAll,
    toggleTreeExpand,
    setAllTreeExpand,
    refreshFilterExpand
  };
}
