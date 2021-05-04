import { Layout, ConfigProvider } from 'antd';
import '@/styles/init.scss';
import '@/styles/iconfont.scss';
import '@/styles/theme.scss';
import '@/styles/public.scss';
import LeftNav from './components/left-nav';
import nav from '@/routers/index';
import { useState } from 'react';
import { INav, IRouter } from '@/interfaces/layout';
import { history } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import { makeStyles } from '@material-ui/styles';
import SecondNav from './components/second-nav';

interface IRouters {
  children: object;
  location: {
    pathname: string;
    query: object;
  };
}

const useStyles = makeStyles({
  //布局
  'ant-layout': {
    height: '100vh',
    background: '#fafafa',
    '& .ant-layout-header': {
      backgroundColor: '#fff',
      height: '50px',
      lineHeight: '50px',
      boxShadow: '0 2px 15px 0 rgba(15, 12, 70, 0.1)',
      padding: '0px 20px',
    },
    '& .ant-layout-sider': {
      overflow: 'hidden',
    },
    '& .ant-layout-content': {
      display: 'flex',
    },
  },
});

const Layouts = (props: IRouters) => {
  const classes = useStyles();
  const { Header, Sider, Content } = Layout;
  const [state, setState] = useState({
    //一级菜单当前索引
    navCurrentKeys: 0,
    //二级菜单当前地址
    secondNavCurrentPath: '',
    //二级菜单列表
    secondNavList: [] as IRouter[],
  });

  /**
   * @description 一级菜单当前索引改变的时候触发
   * @param {number} index 一级菜单当前索引
   */
  const handleNavChange = (index: number): void => {
    if (state.navCurrentKeys != index) {
      const path: string = history.location.pathname;
      const item: INav = nav[index];
      setState({
        secondNavCurrentPath: path,
        secondNavList: item.routers ? item.routers : [],
        navCurrentKeys: index,
      });
    }
  };

  /**
   * @description 跳转二级菜单路由
   * @param {string} url 路由地址
   */
  const handleSeondNavChange = (url: string): void => {
    history.push(url);
    setState({
      ...state,
      secondNavCurrentPath: url,
    });
  };

  return (
    <>
      <ConfigProvider locale={zhCN}>
        <Layout className={classes['ant-layout']}>
          <Sider width={'120px'}>
            <LeftNav
              nav={nav}
              handleNavChange={(index: number) => handleNavChange(index)}
            ></LeftNav>
          </Sider>
          <Layout>
            <Header className="flex">
              <span>微商城</span>
            </Header>
            <Content>
              <SecondNav
                secondNavList={state.secondNavList}
                secondNavCurrentPath={state.secondNavCurrentPath}
                handleSeondNavChange={(path: string) =>
                  handleSeondNavChange(path)
                }
              ></SecondNav>
              <div className="layout-content-body flex flex-col flex-1">
                {props.children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default Layouts;
