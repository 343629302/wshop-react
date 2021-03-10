const routers = {
  title: '商品',
  path: '/goods',
  icon: 'icon-shangpin',
  default: '/goods/list',
  routers: [
    {
      title: '全部商品',
      path: '/goods/list',
      label: '商品管理',
    },
    {
      title: '商品分组',
      path: '/goods/group',
      label: '商品管理',
    },
    {
      title: '商品标签',
      path: '/goods/tag',
      label: '商品管理',
    },
    {
      title: '商品属性',
      path: '/goods/attribute',
      label: '商品管理',
    },
    {
      title: '商品评论',
      path: '/goods/comment',
      label: '系统页面',
    },
  ],
};

export default routers;
