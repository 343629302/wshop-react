//导航接口
export interface INav {
  title?: string;
  path: string;
  icon?: string;
  default?: string;
  routers?: IRouter[];
  redirect?: any;
}

//路由接口
export interface IRouter {
  label: string;
  path: string;
  title: string;
}
