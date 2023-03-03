import { nextTick, ref, watch } from 'vue';
import { get } from 'lodash-es';

/**
 * 请求代理
 * dataKey:绑定数据的key，props:组件属性，emit:组件事件
 * 需要通过props转入的requestConfig进行配置
 * requestConfig对象属性：{ api:请求的方法; params:请求的参数; immediate:是否渲染时就请求}
 */
export function useRequestConfig({ dataKey, props, emit }) {
  const data = ref(props[dataKey]);
  watch(
    () => props[dataKey],
    () => {
      data.value = props[dataKey];
    }
  );

  const loading = ref(props.loading);
  watch(
    () => props.loading,
    () => {
      loading.value = ref(props.loading);
    }
  );

  if (props.requestConfig.immediate !== false) {
    requestData();
  }

  /** 请求数据 */
  async function requestData(params) {
    if (loading.value || typeof props.requestConfig.api !== 'function') {
      return;
    }
    loading.value = true;
    const response = {
      status: '',
      data: null
    };
    const requestParams = params ?? props.requestConfig.params;
    await props.requestConfig
      .api(requestParams)
      .then((res) => {
        response.status = 'success';
        response.data = res;
      })
      .catch((e) => {
        response.status = 'failed';
        response.data = e;
      })
      .finally(() => {
        loading.value = false;
      });
    if (typeof props.requestConfig.result === 'function') {
      // 自定义返回内容
      data.value = props.requestConfig.result(response) || [];
      // 双向绑定数据
      emit(`update:${dataKey}`, data.value);
    } else if (response.status === 'success') {
      if (props.requestConfig.result) {
        data.value = get(response.data, props.requestConfig.result) || [];
      } else {
        data.value = response.data || [];
      }
      // 双向绑定数据
      emit(`update:${dataKey}`, data.value);
    }
    return response;
  }

  /** 向外暴露的请求触发方法 */
  async function commitRequest(params) {
    await nextTick();
    return await requestData(params);
  }

  return {
    loading,
    data,
    commitRequest
  };
}
