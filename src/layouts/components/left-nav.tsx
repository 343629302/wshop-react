import { Menu } from 'antd';
import logo from '@/assets/img/logo.png';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { INav, IRouter } from '@/interfaces/layout';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/styles';

interface IProps {
  nav: INav[];
  handleNavChange: Function;
}

const useStyles = makeStyles({
  //Logo图片
  'layout-left-logo': {
    '& img': {
      width: 40,
    },
    padding: 20,
    margin: '0 20px',
  },

  //导航列表
  'menu-list': {
    '& .ant-menu-item': {
      position: 'relative',
      '&::after': {
        content: '',
        width: 4,
        background: '#fff',
        borderRadius: 2,
        position: 'absolute',
        right: '10px !important',
        top: '25% !important',
        bottom: '25% !important',
        height: 21,
      },
      '&:hover': {
        '&::after': {
          display: 'block',
          transform: 'scaleY(1)',
          opacity: 1,
        },
      },
    },
    '& .ant-menu-item-selected': {
      backgroundColor: 'transparent !important',
      '&::after': {
        display: 'block',
      },
    },
  },
});

const LeftNav = (props: IProps) => {
  const classes = useStyles();

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
      <div className={classes['layout-left-logo']}>
        <img src={logo} alt="" />
      </div>
      {/* 一级菜单 */}
      <Scrollbars>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[`${navCurrentIndex}`]}
          className={classes['menu-list']}
        >
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
