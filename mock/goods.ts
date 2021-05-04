import mockjs from 'mockjs';

export default {
  'Get /api/goods/label': mockjs.mock(() => {
    const ars: object[] = [
      {
        name: '最新',
        id: '0',
      },
      {
        name: '最热',
        id: '1',
      },
      {
        name: '清仓',
        id: '2',
      },
      {
        name: '特价',
        id: '0',
      },
    ];
    return ars;
  }),
};
