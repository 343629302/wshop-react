export interface IIteration {
  id: string;
  name?: string;
  [propName: string]: any;
}

//获取迭代的值
export const getKeyValue = (
  id: string,
  ars: IIteration[],
  key: string = 'name',
): string => {
  let val = '';
  const item = ars.find((item) => item.id === id);
  if (item) {
    val = item[key] ? item[key] : '';
  }
  return val;
};

//店铺页面列表状态
export const storePageListStatus: IIteration[] = [
  {
    id: '1',
    name: '已发布',
  },
  {
    id: '0',
    name: '未发布',
  },
];

//店铺导航已选主题颜色
export const storeTabisSelectThemeColor: IIteration[] = [
  {
    id: 'red',
    color: 'rgb(250, 57, 45)',
  },
  {
    id: 'pink',
    color: 'rgb(255, 125, 172)',
  },
  {
    id: 'yellow',
    color: 'rgb(255, 139, 15)',
  },
  {
    id: 'black',
    color: 'rgb(69, 69, 69)',
  },
];

//店铺导航未选主题颜色
export const storeTabnoSelectThemeColor: IIteration[] = [
  {
    id: 'gray',
    color: 'rgb(178, 177, 175)',
  },
];
