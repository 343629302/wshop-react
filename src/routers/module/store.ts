const routers = {
  title: '店铺',
  path: '/store',
  icon: 'icon-shangdian',
  default: '/store/page-list',
  routers: [
    {
      title: '店铺页面',
      path: '/store/page-list',
      label: '个性装修',
    },
    {
      title: '店铺导航',
      path: '/store/nav',
      label: '个性装修',
    },
    {
      title: '用户中心',
      path: '/store/user',
      label: '系统页面',
    },
    {
      title: '列表模板',
      path: '/store/list-template',
      label: '系统页面',
    },
    {
      title: '分类模板',
      path: '/store/category-template',
      label: '系统页面',
    },
    {
      title: '搜索页',
      path: '/store/search',
      label: '系统页面',
    },
    {
      title: '店铺色系',
      path: '/store/theme',
      label: '店铺风格',
    },
  ],
};

export default routers;
