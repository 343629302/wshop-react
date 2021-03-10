const routers = {
  title: '数据',
  path: '/information',
  icon: 'icon-ico_data',
  default: '/information/situation',
  routers: [
    {
      title: '数据概况',
      path: '/information/situation',
      label: '店铺概况',
    },
    {
      title: '实时监控',
      path: '/information/monitoring',
      label: '店铺概况',
    },
    {
      title: '流量概览',
      path: '/information/flow',
      label: '客流分析',
    },
    {
      title: '页面分析',
      path: '/information/page',
      label: '客流分析',
    },
    {
      title: '留存分析',
      path: '/information/keep',
      label: '客流分析',
    },
    {
      title: '交易概览',
      path: '/information/transaction',
      label: '交易分析',
    },
    {
      title: '商品概览',
      path: '/information/goods',
      label: '商品分析',
    },
    {
      title: '库存预警',
      path: '/information/inventory',
      label: '交易分析',
    },
    {
      title: '搜索偏好',
      path: '/information/search',
      label: '交易分析',
    },
    {
      title: '营销概况',
      path: '/information/marketing',
      label: '营销效果',
    },
  ],
};

export default routers;
