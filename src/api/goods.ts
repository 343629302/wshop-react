import request from '@/tools/request';

//获取商品标签
export const getGoodsLabelsApi = () => {
  return request.get('/api/goods/label');
};
