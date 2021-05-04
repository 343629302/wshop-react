import { makeStyles } from '@material-ui/styles';
import { Layout, Button, Input, Popover, Row, Col } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import mobileTop from '@/assets/img/nav-mobile-top.png';
import { getStoreTabbarApi } from '@/api/store';
import { useEffect, useRef } from 'react';
import useAction from '@/hook/useAction';
import getEnumerateValue from '@/tools/enumerate';
import tabIconImage from '@/assets/img/tab-icon/instantiation';
import { Check, X } from 'react-feather';
import {
  storeTabisSelectThemeColor,
  storeTabnoSelectThemeColor,
  getKeyValue,
} from '@/tools/resource';
import TabsIconSelect, {
  IRef as IIconRef,
} from '@/components/tabs-icon-select';
import PageLinkSelect, {
  IRef as ILinkRef,
  IPageItem,
} from '@/components/page-link-select';

//类型
interface iNavItem {
  title: string;
  icon: string;
  link: string;
  linkTitle: string;
}

interface iState {
  tabs: iNavItem[];
  isSelect: string;
  noSelect: string;
}

//样式
const useStyles = makeStyles({
  'store-nav-warpper': {
    padding: 20,
    '& .prview': {
      '& img': {
        width: 375,
      },
      '& .bg': {
        height: 500,
        width: 375,
      },
      '& .nav-bottom': {
        height: 50,
        width: 375,
        '& .nav-item': {
          '& img': {
            width: 20,
          },
        },
      },
    },
    '& .setting': {
      marginLeft: 30,
      width: 440,
      flexShrink: 0,
      '& .theme-color': {
        height: 50,
        borderRadius: 5,
        padding: 10,
        '& .color': {
          marginLeft: 20,
          marginRight: 10,
          position: 'relative',
          '& .circle': {
            borderRadius: '50%',
            width: 16,
            height: 16,
            border: '2px solid #fff',
          },
          '& .absolute': {
            zIndex: '2',
            left: 10,
          },
        },
      },
      '& .nav-list': {
        marginTop: 10,
        '& .nav-item': {
          height: 265,
          border: '1px solid #e3e2e5',
          borderRadius: 4,
          '& .item-top': {
            backgroundColor: '#efefef',
            height: 39,
            padding: '0 19px 0 9px',
          },
          '& .item-content': {
            padding: 10,
            '& button': {
              '&:hover': {
                '& .secondary-text-color': {
                  color: '#1890ff',
                },
              },
            },
            '& .icon-btn': {
              padding: '5.6px 0px',
              textAlign: 'left',
              '&:hover': {
                color: '#1890ff',
                backgroundColor: '#fff',
              },
            },
            '& .icon-img': {
              '& img': {
                height: 35,
                width: 35,
                border: '1px solid #e3e2e5',
                borderRadius: 4,
              },
            },
          },
        },
      },
    },
  },
  'select-color-warpper': {
    padding: '12px 16px',
    width: 250,
    '& .title': {
      marginBottom: 20,
      fontSize: 13,
    },
    '& .select-box': {
      '& .color-list': {
        '& .color-item': {
          width: 20,
          height: 20,
          borderRadius: 4,
          marginRight: 15,
        },
      },
    },
  },
});

const StoreNav = () => {
  const { Footer } = Layout;
  const classes = useStyles();

  const initState: iState = {
    tabs: [],
    isSelect: '',
    noSelect: '',
  };

  const { state, setState, handleInputChange } = useAction(initState);
  const iconSelectRef = useRef<IIconRef>({} as IIconRef);
  const linkSelectRef = useRef<ILinkRef>({} as ILinkRef);

  useEffect(() => {
    getStoreTabbar();
  }, []);

  //获取小程序导航数组
  const getStoreTabbar = async () => {
    const res = await getStoreTabbarApi();
    setState({
      tabs: res.data.tabs,
      isSelect: res.data.isSelect,
      noSelect: res.data.noSelect,
    });
  };

  //处理颜色改变
  const handleColorSelect = (val: string, key: string) => {
    //如果is就是改变已选的颜色
    if (key === 'is') {
      setState({
        isSelect: val,
      });
    } else {
      setState({
        noSelect: val,
      });
    }
  };

  //显示选择图标弹窗
  const handleTabsIconSelectShow = (key: string, index: number) => {
    const path = `tabs[${index}].icon`;
    iconSelectRef.current.init(key, path);
  };

  //选择图标回调
  const handleIconSelectConfirm = (key: string, path: string) => {
    setState({
      [path]: key,
    });
  };

  //显示选择页面弹窗
  const handleTabsLinkSelectShow = (
    link: string,
    name: string,
    index: number,
  ) => {
    const path = `tabs[${index}]`;
    linkSelectRef.current.init(
      {
        link,
        name,
      },
      path,
    );
  };

  //选择页面回调
  const handleLinkSelectConfirm = (event: IPageItem, path: string) => {
    const { link, name } = event;
    const namePath = `${path}.linkTitle`;
    const linkPath = `${path}.link`;
    setState({
      [namePath]: name,
      [linkPath]: link,
    });
  };

  return (
    <>
      <Scrollbars>
        <div className="public-content-warpper">
          <div className="list-header">
            <div className="page-name">页面导航</div>
          </div>
          <div className="public-content-body public-bg-gray">
            <div
              className={`${classes['store-nav-warpper']} public-table-warpper flex`}
            >
              <div className="prview">
                <img src={mobileTop} alt="" />
                <div className="bg-white bg"></div>
                <div className="nav-bottom flex bg-white">
                  {state.tabs.map((item: iNavItem, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center justify-center nav-item"
                      >
                        <img
                          src={getEnumerateValue(
                            tabIconImage,
                            `${item.icon}-${state.isSelect}`,
                          )}
                          alt=""
                        />
                        <span className="mt-1">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="setting">
                <div className="theme-color flex items-center bg-white">
                  <span>导航配色</span>
                  <div className="color flex items-center">
                    <div
                      style={{
                        backgroundColor: getKeyValue(
                          state.isSelect,
                          storeTabisSelectThemeColor,
                          'color',
                        ),
                      }}
                      className="circle"
                    ></div>
                    <div
                      style={{
                        backgroundColor: getKeyValue(
                          state.noSelect,
                          storeTabnoSelectThemeColor,
                          'color',
                        ),
                      }}
                      className="circle absolute"
                    ></div>
                  </div>
                  <Popover
                    placement="bottom"
                    content={
                      <div className={classes['select-color-warpper']}>
                        <div className="title">图标选中状态</div>
                        <div className="select-box flex items-center mb-3">
                          <span className="mr-5">选中</span>
                          <div className="color-list flex items-center cursor-pointer">
                            {storeTabisSelectThemeColor.map((item) => {
                              return (
                                <div
                                  className="color-item flex items-center justify-center"
                                  style={{ backgroundColor: item.color }}
                                  key={item.id}
                                  onClick={() =>
                                    handleColorSelect(item.id, 'is')
                                  }
                                >
                                  {item.id === state.isSelect && (
                                    <Check color="white" size={13} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="select-box flex items-center">
                          <span className="mr-5">未选</span>
                          <div className="color-list flex items-center">
                            {storeTabnoSelectThemeColor.map((item) => {
                              return (
                                <div
                                  className="color-item cursor-pointer flex items-center justify-center"
                                  style={{ backgroundColor: item.color }}
                                  key={item.id}
                                  onClick={() =>
                                    handleColorSelect(item.id, 'no')
                                  }
                                >
                                  {item.id === state.noSelect && (
                                    <Check color="white" size={13} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    }
                    trigger="click"
                  >
                    <Button type="text">修改</Button>
                  </Popover>
                </div>
                <div className="nav-list">
                  <Row gutter={[10, 10]}>
                    {state.tabs.map((item: iNavItem, index: number) => {
                      return (
                        <Col span={12} key={index}>
                          <div className="nav-item bg-white">
                            <div className="item-top flex items-center justify-between">
                              <span>导航{index}</span>
                              {index != 0 && (
                                <X
                                  size={16}
                                  color={'rgb(178, 174, 188)'}
                                  className="cursor-pointer"
                                ></X>
                              )}
                            </div>
                            <div className="item-content flex flex-col">
                              <div className="flex items-center mt-2 mb-3">
                                <span className="flex-shrink-0 mr-3">名称</span>
                                <Input
                                  maxLength={4}
                                  value={item.title}
                                  onChange={(event) =>
                                    handleInputChange(
                                      event,
                                      `tabs[${index}].title`,
                                    )
                                  }
                                  suffix={
                                    <span className="secondary-text-color">
                                      {item.title.length} / 4
                                    </span>
                                  }
                                ></Input>
                              </div>
                              <div className="flex items-center mt-3 mb-3">
                                <span className="flex-shrink-0 mr-3">链接</span>
                                {index === 0 ? (
                                  <span
                                    style={{ height: '32px' }}
                                    className="flex items-center"
                                  >
                                    首页
                                  </span>
                                ) : (
                                  <Button
                                    className="flex-1"
                                    onClick={() =>
                                      handleTabsLinkSelectShow(
                                        item.link,
                                        item.linkTitle,
                                        index,
                                      )
                                    }
                                  >
                                    <div className="flex items-center justify-between">
                                      <span style={{ color: '#595961' }}>
                                        {item.linkTitle}
                                      </span>
                                      <span className="secondary-text-color">
                                        修改
                                      </span>
                                    </div>
                                  </Button>
                                )}
                              </div>
                              <div className="flex  mt-3 mb-2">
                                <span
                                  className="flex-shrink-0 mr-3"
                                  style={{ lineHeight: '32px' }}
                                >
                                  图标
                                </span>
                                <div className="flex flex-col">
                                  <Button
                                    type="text"
                                    className="icon-btn"
                                    onClick={() =>
                                      handleTabsIconSelectShow(item.icon, index)
                                    }
                                  >
                                    选择图标
                                  </Button>
                                  <div className="icon-img flex items-center mt-2">
                                    <img
                                      src={getEnumerateValue(
                                        tabIconImage,
                                        `${item.icon}-${state.isSelect}`,
                                      )}
                                      alt=""
                                      className="mr-4"
                                    />
                                    <img
                                      src={getEnumerateValue(
                                        tabIconImage,
                                        `${item.icon}-${state.noSelect}`,
                                      )}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
      <Footer className="public-bottom-warpper public-bottom-botton">
        <Button type="primary">保存</Button>
      </Footer>
      <TabsIconSelect
        ref={iconSelectRef}
        onConfirm={(key: string, path: string) =>
          handleIconSelectConfirm(key, path)
        }
      />
      <PageLinkSelect
        ref={linkSelectRef}
        onConfirm={(event: IPageItem, path: string) =>
          handleLinkSelectConfirm(event, path)
        }
      ></PageLinkSelect>
    </>
  );
};

export default StoreNav;
