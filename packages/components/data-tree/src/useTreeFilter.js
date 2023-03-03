import { computed } from 'vue';

/** 树筛选 */
export function useTreeFilter(props) {
  // 根据${}剪切出对应的拼接字段，'我叫${name}性别${sex}'.split(/\$\{(.+?)\}/gi) = ['我叫', 'name', '性别', 'sex', '']
  const sliceList = props.labelHtml ? props.labelHtml.split(/\${(.+?)}/gi) : [props.labelKey];

  const replaceText = computed(() => {
    return `<span style='color: ${props.filterColor}'>${props.filterText}</span>`;
  });

  /** 获取拼接后数据 */
  function joinFilterText(node) {
    // 比较保存的渲染数据，防止重复处理
    if (node._FILTER_TEXT && node._FILTER_TEXT.filter === props.filterText) {
      return node._FILTER_TEXT.text;
    }
    let str = '';
    if (sliceList.length <= 1) {
      str = replaceFilterText(node[props.labelKey]);
    } else {
      for (let i = 0; i < sliceList.length / 2; i++) {
        // 一个字符一个字段间隔拼接起来
        str += sliceList[2 * i];
        if (sliceList[2 * i + 1]) {
          str += replaceFilterText(node[sliceList[2 * i + 1]]);
        }
      }
    }
    node._FILTER_TEXT = {
      filter: props.filterText,
      text: str
    };
    return str;
  }

  /** 替换搜索的文本内容 */
  function replaceFilterText(text) {
    const str = text?.replace(/(<([^>]+)>)/gi, '') || ''; // 防html注入
    if (!props.filterText) {
      return str;
    }
    return str?.replaceAll(props.filterText, replaceText.value) || '';
  }

  return { joinFilterText };
}
