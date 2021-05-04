export function patchRoutes(event: any) {
  const routes = event.routes;
  //添加一个路由,如果跳转的页面没有则返回首页
  routes[0].routes.push({
    path: '*',
    redirect: '/',
  });
}
