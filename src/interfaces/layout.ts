export interface INav {
  title: string;
  path: string;
  icon: string;
  default?: string;
  routers?: IRouter[];
}

export interface IRouter {
  label: string;
  path: string;
  title: string;
}
