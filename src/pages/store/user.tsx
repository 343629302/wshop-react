import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Button, Collapse, Checkbox } from 'antd';
import { makeStyles } from '@material-ui/styles';
import NavImage from '@/assets/img/other-mobile-top.png';
import Avatar from '@/assets/img/avatar.png';
import Payment from '@/assets/img/payment.png';
import Delivered from '@/assets/img/delivered.png';
import Receipt from '@/assets/img/receipt.png';
import Evaluation from '@/assets/img/evaluation.png';
import Return from '@/assets/img/return.png';
import { ChevronRight, X } from 'react-feather';
import { getStroeUserSettingApi } from '@/api/store';
import { useEffect, useRef, useState } from 'react';
import useAction from '@/hook/useAction';
import getEnumerateValue from '@/tools/enumerate';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import DefaultImg from '@/assets/img/default-img.png';
import ImageSelect, { IRef as IImageRef } from '@/components/image-select';
import PageLinkSelect, {
  IRef as ILinkRef,
  IPageItem,
} from '@/components/page-link-select';
import StoreMenusDrag, { iMeunItem } from './components/store-menus-drag';
import DragContent from '@/components/drag-content';

//类型
interface iState {
  meunShow: string;
  navPicOneShow: string;
  navPicTwoShow: string;
  navPicOne: iNavPicItem;
  navPicTwo: iNavPicItem;
  meunList: iMeunItem[];
}

interface iNavPicItem {
  image: string;
  link: string;
  linkTitle: string;
}

//样式
const useStyles = makeStyles({
  'store-user-warpper': {
    display: 'flex',
    '& .prview': {
      height: 500,
      width: 390,
      backgroundColor: '#F2F2F6',
      '& .page-nav': {
        position: 'relative',
        backgroundColor: '#fff',
        '& img': {
          width: '100%',
        },
        '& span': {
          position: 'absolute',
          marginTop: 10,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 15,
          fontWeight: 'bold',
          color: '#333',
        },
      },
      '& .page-header': {
        margin: '60px 10px 15px 10px',
        borderRadius: 6,
        backgroundColor: '#fff',
        '& .user-info': {
          position: 'relative',
          top: '-20px',
          padding: '0px 20px',
          '& img': {
            width: 60,
            borderRadius: '50%',
          },
          '& span': {
            paddingLeft: 20,
            fontSize: 15,
            marginTop: 20,
          },
        },
        '& .user-record': {
          '& .record-item': {
            height: 70,
            '& .iconfont': {
              fontSize: 25,
              marginBottom: 10,
            },
          },
        },
      },
      '& .page-order': {
        margin: '0px 10px',
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: '0px 10px',
        '& .title': {
          height: 40,
          borderBottom: '1px solid #d7dae2',
          fontSize: 14,
        },
        '& .order-list': {
          '& .order-item': {
            height: 80,
            '& img': {
              width: 25,
              marginBottom: 5,
            },
          },
        },
      },
      '& .page-nav-pic': {
        height: 100,
        margin: '0px 10px',
        marginTop: 15,
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      },
      '& .page-menu': {
        margin: '15px 10px',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 6,
        overflow: 'hidden',
        '& .menu-item': {
          '&:not(:nth-last-of-type(1))': {
            borderBottom: '1px solid #d7dae2',
          },
          height: 40,
          padding: '0px 15px',
          '& .iconfont': {
            fontSize: 18,
            marginRight: 10,
          },
        },
      },
    },
    '& .setting': {
      width: 500,
      marginLeft: 20,
      '& .setting-item': {
        display: 'flex',
        '&:not(:nth-of-type(1))': {
          marginTop: 17,
        },
        '& > .title': {
          flexShrink: 0,
          width: 70,
          marginTop: 7,
        },
      },
      '& .c-nav-pic-warpper': {
        position: 'relative',
        width: 80,
      },
      '& .nav-pic': {
        width: 80,
        height: 40,
      },
      '& .drag-title': {
        paddingTop: 7,
        color: '#9797A1',
        display: 'block',
      },
      '& .drag-content': {
        borderRadius: 4,
        border: '1px solid #E3E2E5',
        maxWidth: 350,
        marginTop: 10,
      },
    },
  },
});

const StoreUser = () => {
  const { Footer } = Layout;
  const { Panel } = Collapse;
  const classes = useStyles();
  const records = [
    {
      name: '我的收藏',
      icon: 'icon-xin',
    },
    {
      name: '浏览足迹',
      icon: 'icon-zuji',
    },
    {
      name: '优惠中心',
      icon: 'icon-liwu1',
    },
  ];
  const orders = [
    {
      name: '待付款',
      icon: Payment,
    },
    {
      name: '待发货',
      icon: Delivered,
    },
    {
      name: '待收货',
      icon: Receipt,
    },
    {
      name: '待评价',
      icon: Evaluation,
    },
    {
      name: '售后/退款',
      icon: Return,
    },
  ];
  const initState: iState = {
    meunShow: '1',
    navPicOneShow: '0',
    navPicTwoShow: '0',
    navPicOne: {} as iNavPicItem,
    navPicTwo: {} as iNavPicItem,
    meunList: [],
  };

  const { state, setState } = useAction(initState);
  const imageSelectRef = useRef<IImageRef>({} as IImageRef);
  const linkSelectRef = useRef<ILinkRef>({} as ILinkRef);

  useEffect(() => {
    getStroeUserSetting();
  }, []);

  //阻止点击选择框的时候对折叠面板事件的传播
  const handleStopEvening = (event: any) => {
    event.stopPropagation();
  };

  //获取小程序用户页设置
  const getStroeUserSetting = async () => {
    const res = await getStroeUserSettingApi();
    setState(res.data);
  };

  //设置显示选择触发
  const handleSettingSelect = (event: CheckboxChangeEvent, key: string) => {
    const value = event.target.checked ? '1' : '0';
    setState({
      [key]: value,
    });
  };

  //显示图片素材弹窗
  const handleImageSelectShow = (path: string) => {
    imageSelectRef.current.init(path);
  };

  //广告图片改变
  const handleNavImageChange = (image: string, path: string) => {
    setState({
      [path]: image,
    });
  };

  //显示选择页面弹窗
  const handleTabsLinkSelectShow = (key: string) => {
    let path = '';
    if (key === 'one') {
      path = 'navPicOne';
    } else {
      path = 'navPicTwo';
    }
    const item = getEnumerateValue(state, path);
    let link = item.link;
    let name = item.linkTitle;
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
    const { link, name, groupName } = event;
    const namePath = `${path}.linkTitle`;
    const linkPath = `${path}.link`;
    setState({
      [namePath]: groupName ? `${groupName} - ${name}` : name,
      [linkPath]: link,
    });
  };

  //拖拽完毕
  const handleDragEnd = (newIndex: number, oldIndex: number) => {
    const list = [...state.meunList];
    const item = list[oldIndex];
    list.splice(oldIndex, 1);
    list.splice(newIndex, 0, item);
    setState({
      meunList: list,
    });
  };

  //选择菜单是否显示
  const handleMenuItemShowChange = (status: boolean, index: number) => {
    const path = `meunList[${index}].show`;
    setState({
      [path]: status ? '1' : '0',
    });
  };

  //保存
  const handleConfirm = () => {};

  return (
    <>
      <Scrollbars>
        <div className="public-content-warpper">
          <div className="list-header">
            <div className="page-name">用户中心设置</div>
          </div>
          <div
            className={`public-content-body public-bg-gray ${classes['store-user-warpper']}`}
          >
            <div className="prview">
              <Scrollbars>
                <div className="page-nav">
                  <img src={NavImage} alt="" />
                  <span>页面名称</span>
                </div>

                <div className="page-header">
                  <div className="user-info flex items-center">
                    <img src={Avatar} alt="" />
                    <span>用户姓名</span>
                  </div>
                  <ul className="user-record flex">
                    {records.map((item, index) => {
                      return (
                        <li
                          className="record-item flex-1 flex items-center justify-center flex-col"
                          key={index}
                        >
                          <span className={`${item.icon} iconfont`}></span>
                          <span>{item.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="page-order">
                  <div className="title flex items-center">我的订单</div>
                  <ul className="order-list flex">
                    {orders.map((item, index) => {
                      return (
                        <li
                          className="flex-1 order-item flex items-center flex-col justify-center"
                          key={index}
                        >
                          <img src={item.icon} alt="" />
                          <span> {item.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {state.navPicOneShow == '1' && (
                  <div className="page-nav-pic">
                    {state.navPicOne.image && (
                      <img src={state.navPicOne.image} alt="" />
                    )}
                  </div>
                )}

                <ul className="page-menu">
                  {state.meunList.map((item, index) => {
                    return (
                      item.show == '1' && (
                        <li key={index} className="menu-item flex items-center">
                          <span className={`${item.icon} iconfont`}></span>
                          <span className="flex-1">{item.name}</span>
                          <ChevronRight size={15} />
                        </li>
                      )
                    );
                  })}
                </ul>

                {state.navPicTwoShow == '1' && (
                  <div
                    className="page-nav-pic"
                    style={{ marginBottom: '20px' }}
                  >
                    {state.navPicTwo.image && (
                      <img src={state.navPicTwo.image} alt="" />
                    )}
                  </div>
                )}
              </Scrollbars>
            </div>
            <div className="setting">
              <Collapse
                accordion
                defaultActiveKey={['1']}
                expandIcon={(panelProps) => {
                  const key = panelProps.className || '';
                  const check = getEnumerateValue(state, key);
                  return (
                    <Checkbox
                      checked={check === '1'}
                      disabled={key === 'meunShow'}
                      onChange={(event) => handleSettingSelect(event, key)}
                      onClick={(event) => handleStopEvening(event)}
                    ></Checkbox>
                  );
                }}
              >
                <Panel header="图片导航1" key="1" className="navPicOneShow">
                  <div className="setting-item">
                    <span className="title">图片上传</span>
                    <div className="flex flex-col">
                      {state.navPicOne.image ? (
                        <div className="c-nav-pic-warpper">
                          <img
                            src={state.navPicOne.image}
                            alt=""
                            className="nav-pic"
                          />
                          <div
                            className="iamge-x-close"
                            onClick={() =>
                              handleNavImageChange('', 'navPicOne.image')
                            }
                          >
                            <X color="#909399" size={12}></X>
                          </div>
                        </div>
                      ) : (
                        <img src={DefaultImg} alt="" className="nav-pic" />
                      )}

                      <Button
                        className="mt-2"
                        onClick={() => handleImageSelectShow('navPicOne.image')}
                      >
                        选择图片
                      </Button>

                      <span className="mt-2" style={{ color: '#9797A1' }}>
                        建议尺寸750px*200px
                      </span>
                    </div>
                  </div>
                  <div className="setting-item">
                    <span className="title">图片链接</span>
                    <div className="flex flex-col">
                      <Button onClick={() => handleTabsLinkSelectShow('one')}>
                        选择链接
                      </Button>
                      {state.navPicOne.link && (
                        <span className="mt-2">
                          {state.navPicOne.linkTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </Panel>
                <Panel header="菜单" key="2" className="meunShow" forceRender>
                  <div className="setting-item">
                    <span className="title">设置菜单</span>
                    <div className="flex-1">
                      <span className="drag-title">长按点击可拖拽调整顺序</span>
                      <div className="drag-content">
                        <DragContent
                          dragId="store-menu-drag"
                          handleDragEnd={(newIndex, oldIndex) =>
                            handleDragEnd(newIndex, oldIndex)
                          }
                        >
                          <StoreMenusDrag
                            list={state.meunList}
                            handleMenuItemShowChange={(status, index) =>
                              handleMenuItemShowChange(status, index)
                            }
                          ></StoreMenusDrag>
                        </DragContent>
                      </div>
                    </div>
                  </div>
                </Panel>
                <Panel header="图片导航2" key="3" className="navPicTwoShow">
                  <div className="setting-item">
                    <span className="title">图片上传</span>
                    <div className="flex flex-col">
                      {state.navPicTwo.image ? (
                        <div className="c-nav-pic-warpper">
                          <img
                            src={state.navPicTwo.image}
                            alt=""
                            className="nav-pic"
                          />
                          <div
                            className="iamge-x-close"
                            onClick={() =>
                              handleNavImageChange('', 'navPicTwo.image')
                            }
                          >
                            <X color="#909399" size={12}></X>
                          </div>
                        </div>
                      ) : (
                        <img src={DefaultImg} alt="" className="nav-pic" />
                      )}

                      <Button
                        className="mt-2"
                        onClick={() => handleImageSelectShow('navPicTwo.image')}
                      >
                        选择图片
                      </Button>

                      <span className="mt-2" style={{ color: '#9797A1' }}>
                        建议尺寸750px*200px
                      </span>
                    </div>
                  </div>
                  <div className="setting-item">
                    <span className="title">图片链接</span>
                    <div className="flex flex-col">
                      <Button onClick={() => handleTabsLinkSelectShow('two')}>
                        选择链接
                      </Button>
                      {state.navPicTwo.link && (
                        <span className="mt-2">
                          {state.navPicTwo.linkTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </Scrollbars>
      <Footer className="public-bottom-warpper public-bottom-botton">
        <Button type="primary" onClick={() => handleConfirm()}>
          保存
        </Button>
      </Footer>
      <ImageSelect
        ref={imageSelectRef}
        onConfrim={(image, path) => handleNavImageChange(image, path)}
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

export default StoreUser;
