import mockjs from 'mockjs';

export default {
  'Get /api/store/page': mockjs.mock(() => {
    let ars: object[] = [];
    for (let i = 0; i < 10; i++) {
      ars.push({
        name: '测试1',
        status: '0',
        date: '2020-06-13 21:59:20',
        id: i,
      });
    }
    return ars;
  }),
  'Get /api/store/tabbar': {
    isSelect: 'red',
    noSelect: 'gray',
    tabs: [
      {
        icon: 'home',
        title: '首页',
        link: '/tab/index',
        linkTitle: '首页',
      },
      {
        icon: 'classify',
        title: '分类',
        link: '/tab/classify',
        linkTitle: '分类',
      },
      {
        icon: 'car',
        title: '购物车',
        link: '/tab/car',
        linkTitle: '购物车',
      },
      {
        icon: 'user',
        title: '我的',
        link: '/tab/user',
        linkTitle: '我的',
      },
    ],
  },
  'Get /api/page/link': mockjs.mock(() => {
    const links: any[] = [
      {
        name: '功能页面',
        pages: [
          {
            name: '首页',
            link: '/tab/index',
          },
          {
            name: '分类',
            link: '/tab/classify',
          },
          {
            name: '购物车',
            link: '/tab/car',
          },
          {
            name: '我的',
            link: '/tab/user',
          },
        ],
      },
      {
        name: '装修页面',
        pages: [
          {
            name: '装修页面1',
            link: '/custom/1',
          },
          {
            name: '装修页面2',
            link: '/custom/2',
          },
          {
            name: '装修页面3',
            link: '/custom/3',
          },
          {
            name: '装修页面4',
            link: '/custom/4',
          },
          {
            name: '装修页面5',
            link: '/custom/5',
          },
        ],
      },
    ];
    return links;
  }),
  'Get /api/store/user': {
    meunShow: '1',
    navPicOneShow: '0',
    navPicTwoShow: '0',
    navPicOne: {
      image: '',
      link: '',
      linkTitle: '',
    },
    navPicTow: {
      image: '',
      link: '',
      linkTitle: '',
    },
    meunList: [
      {
        show: '1',
        name: '收货地址',
        icon: 'icon-shouhuodizhi',
      },
      {
        show: '1',
        name: '分销中心',
        icon: 'icon-fenxiao',
      },
      {
        show: '1',
        name: '优惠卷',
        icon: 'icon-youhuiquan3',
      },
      {
        show: '1',
        name: '拼团中心',
        icon: 'icon-pintuan1',
      },
    ],
  },
  'Get /api/material/gallery': mockjs.mock(() => {
    const ars: object[] = [
      {
        title: '图片1',
        image: 'https://z3.ax1x.com/2021/04/06/clwV2Q.jpg',
        format: 'JPG',
        width: 200,
        height: 100,
      },
      {
        title: '图片2',
        image: 'https://z3.ax1x.com/2021/04/06/clwZvj.jpg',
        format: 'JPG',
        width: 200,
        height: 100,
      },
      {
        title: '图片3',
        image: 'https://z3.ax1x.com/2021/04/06/clwmKs.jpg',
        format: 'JPG',
        width: 200,
        height: 100,
      },
      {
        title: '图片4',
        image: 'https://z3.ax1x.com/2021/04/06/clwE8g.jpg',
        format: 'JPG',
        width: 200,
        height: 100,
      },
      {
        title: '图片5',
        image: 'https://z3.ax1x.com/2021/04/06/clwAPS.jpg',
        format: 'JPG',
        width: 200,
        height: 100,
      },
      {
        title: '图片6',
        image: 'https://z3.ax1x.com/2021/04/06/clwnrn.jpg',
        format: 'JPG',
        width: 200,
        height: 100,
      },
    ];
    return ars;
  }),
};
