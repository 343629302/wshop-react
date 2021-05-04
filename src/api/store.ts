import request from '@/tools/request';
import { iTableParams } from '@/interfaces/public';

//获取店铺页面列表
export const getStorePageListApi = (params: iTableParams) => {
  return request.get('/api/store/page', {
    params,
  });
};

//获取小程序导航数组
export const getStoreTabbarApi = () => {
  return request.get('/api/store/tabbar');
};

//获取小程序页面链接
export const getPageLinkApi = (type: string = '0') => {
  return request.get('/api/page/link', {
    params: {
      type,
    },
  });
};

//获取小程序用户页设置
export const getStroeUserSettingApi = () => {
  return request.get('/api/store/user');
};
