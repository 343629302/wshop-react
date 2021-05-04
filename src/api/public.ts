import request from '@/tools/request';

/**
 * @description 获取素材图片库
 */
export const getMaterialGalleryApi = () => {
  return request.get('/api/material/gallery');
};
