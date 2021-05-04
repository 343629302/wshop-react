import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
const request = axios.create();
import { message } from 'antd';

interface iPendingItem {
  name: string;
  cancel: Canceler;
}

//正在请求中数组
let pendingRequest: iPendingItem[] = [];

//检查是否已经等待中的请求
const checkPending = (config: AxiosRequestConfig): AxiosRequestConfig => {
  //创建请求标识符
  const requestMark = `${config.method}-${config.url}`;
  const markIndex = pendingRequest.findIndex(
    (item: iPendingItem) => item.name === requestMark,
  );
  //如果该请求已经存在等待,则取消上一个请求,并且清除该标识符
  if (markIndex != -1) {
    pendingRequest[markIndex].cancel();
    pendingRequest.splice(markIndex, 1);
  }
  //添加新的标识符
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  config.cancelToken = source.token;
  config.requestMark = requestMark;
  pendingRequest.push({
    name: requestMark,
    cancel: source.cancel,
  });
  return config;
};

//删除请求中的标识符
const deletePending = (config: AxiosRequestConfig) => {
  const markIndex = pendingRequest.findIndex(
    (item: iPendingItem) => item.name === config.requestMark,
  );
  markIndex != -1 && pendingRequest.splice(markIndex, 1);
};

//处理错误返回
const handleError = (status: number, msg: string = '') => {
  switch (status) {
    case 401:
      message.error('未登陆,请登录');
      break;
    case 403:
      message.error('登录过期,请重新登录');
      break;
    case 404:
      message.error('请求资源不存在');
      break;
    default:
      message.error(msg);
  }
};

//请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    //检查并添加标识符
    config = checkPending(config);
    config.headers.Authorization = 'token';
    return config;
  },
);

//响应拦截器
request.interceptors.response.use(
  (
    res: AxiosResponse<any>,
  ): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
    deletePending(res.config);
    if (res.statusText != 'OK') {
      message.error(res.message);
    }
    return res;
  },
  (error: any) => {
    const { response } = error;
    //判断请求是否已经发出
    if (response) {
      deletePending(response.config);
      handleError(response.status, response.message);
      return response;
    }
  },
);

export default request;
