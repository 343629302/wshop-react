import { Layout } from 'antd';
import '@/styles/init.scss';
import './index.scss';
import '@/styles/iconfont.scss';
import '@/styles/theme.scss';
import LeftNav from './components/left-nav';
import nav from '@/routers/index';
import { useState } from 'react';
import { INav, IRouter } from '@/interfaces/layout';
import { history } from 'umi';
import { Scrollbars } from 'react-custom-scrollbars';

interface IRouters {
  children: object;
  location: {
    pathname: string;
    query: object;
  };
}

interface ISecondItem {
  label: string;
  list: IRouter[];
}

const Layouts = (props: IRouters) => {
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

  /**
   * @description 返回二级菜单部件
   */
  const secondNavWidget = (): JSX.Element => {
    if (state.secondNavList.length > 0) {
      const list: ISecondItem[] = [];
      //遍历出部件数组
      state.secondNavList.forEach((item: IRouter) => {
        const index = list.findIndex(
          (lItem: ISecondItem) => lItem.label === item.label,
        );
        if (index === -1) {
          list.push({
            label: item.label,
            list: [item],
          });
        } else {
          list[index].list.push(item);
        }
      });
      return (
        <div className="layout-second-nav">
          <Scrollbars>
            {list.map((item: ISecondItem) => {
              return (
                <div className="second-item" key={item.label}>
                  <div className="second-item-title">{item.label}</div>
                  <div className="second-item-list">
                    {item.list.map((lItem: IRouter) => {
                      return (
                        <div
                          key={lItem.path}
                          className={
                            state.secondNavCurrentPath === lItem.path
                              ? 'active'
                              : ''
                          }
                          onClick={() => handleSeondNavChange(lItem.path)}
                        >
                          {lItem.title}
                        </div>
                      );
                    })}
                  </div>
                  <div className="line"></div>
                </div>
              );
            })}
          </Scrollbars>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Layout>
      <Sider width={'120px'}>
        <LeftNav
          nav={nav}
          handleNavChange={(index: number) => handleNavChange(index)}
        ></LeftNav>
      </Sider>

      <Layout>
        <Header>
          <span>微商城</span>
        </Header>
        <Content>
          {secondNavWidget()}
          <div className="layout-content-body flex flex-col flex-1">
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
