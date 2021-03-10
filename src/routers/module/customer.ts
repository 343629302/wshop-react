const routers = {
  title: '客户',
  path: '/customer',
  icon: 'icon-kehu',
  default: '/customer/list',
  routers: [
    {
      title: '全部客户',
      path: '/customer/list',
      label: '客户管理',
    },
    {
      title: '客户标签',
      path: '/customer/tag',
      label: '客户管理',
    },
    {
      title: '黑名单管理',
      path: '/customer/blacklist',
      label: '客户管理',
    },
  ],
};

export default routers;
