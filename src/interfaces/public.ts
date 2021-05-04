//表格接口
export interface iTableParams {
  page: number;
  size: number;
  keyWord?: string;
  status?: string | number | undefined;
  [propName: string]: any;
}
