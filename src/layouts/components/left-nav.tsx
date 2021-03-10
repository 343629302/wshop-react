import { Menu } from 'antd';
import './left-nav.scss';
import logo from '@/assets/img/logo.png';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { INav, IRouter } from '@/interfaces/layout';
import { Scrollbars } from 'react-custom-scrollbars';

interface IProps {
  nav: INav[];
  handleNavChange: Function;
}

const LeftNav = (props: IProps) => {
  //一级菜单当前索引
  const [navCurrentIndex, setNavCurrentIndex] = useState(0);

  //初始化时触发,根据当前路由修改一级菜单的当前索引值
  useEffect(() => {
    const path = history.location.pathname;
    props.nav.forEach((item: INav, index: number) => {
      if (item.path === path || (item.default && item.default === path)) {
        setNavCurrentIndex(index);
        return;
      }
      if (item.routers) {
        item.routers.forEach((rItem: IRouter) => {
          if (rItem.path === path) {
            setNavCurrentIndex(index);
            return;
          }
        });
      }
    });
  }, []);

  //一级菜单当前索引值改变时,传回父组件
  useEffect(() => {
    props.handleNavChange(navCurrentIndex);
  }, [navCurrentIndex]);

  /**
   * @description 一级菜单路由跳转
   * @param {string} url   跳转地址
   * @param {number} index 路由索引
   */
  const jumpToPage = (url: string, index: number): void => {
    history.push(url);
    setNavCurrentIndex(index);
  };

  return (
    <>
      {/* logo图片 */}
      <div className="layout-left-logo">
        <img src={logo} alt="" />
      </div>
      {/* 一级菜单 */}
      <Scrollbars>
        <Menu theme="dark" mode="inline" selectedKeys={[`${navCurrentIndex}`]}>
          {props.nav.map((item: INav, index: number) => {
            return (
              <Menu.Item
                key={index}
                icon={<span className={`iconfont ${item.icon}`}></span>}
                onClick={() =>
                  jumpToPage(item.default ? item.default : item.path, index)
                }
              >
                {item.title}
              </Menu.Item>
            );
          })}
        </Menu>
      </Scrollbars>
    </>
  );
};

export default LeftNav;
