const routers = {
  title: '订单',
  path: '/order',
  icon: 'icon-aiguifanfile',
  default: '/order/list',
  routers: [
    {
      title: '全部订单',
      path: '/order/list',
      label: '订单查询',
    },
    {
      title: '支付单查询',
      path: '/order/pay',
      label: '订单查询',
    },
    {
      title: '发货管理',
      path: '/order/deliver',
      label: '订单管理',
    },
    {
      title: '自提管理',
      path: '/order/mention',
      label: '订单管理',
    },
    {
      title: '售后订单',
      path: '/order/refund',
      label: '售后管理',
    },
    {
      title: '换货订单',
      path: '/order/exchange',
      label: '售后管理',
    },
  ],
};

export default routers;
