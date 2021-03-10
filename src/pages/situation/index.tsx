import { history } from 'umi';
import { Scrollbars } from 'react-custom-scrollbars';
import './index.scss';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import {
  a01,
  a02,
  a04,
  a05,
  a07,
  a08,
  discountlist,
  freeExpressList,
  fullDiscountList,
  kanjia,
  list,
  pintuan,
} from '@/assets/img/situation/instantiation';

interface IInformationItem {
  title: string;
  code: string;
  count: number;
}

interface ICommonItem {
  img: string;
  title: string;
  path: string;
}

interface IMarketingItem extends ICommonItem {
  secondTitle: string;
}

const Situation = () => {
  const [informations, setInformations] = useState(
    //订单概况信息
    [
      {
        title: '待付款订单',
        code: 'waitPay',
        count: 0,
      },
      {
        title: '待发货订单',
        code: 'waitDeliver',
        count: 0,
      },
      {
        title: '待售后订单',
        code: 'waitRefund',
        count: 0,
      },
      {
        title: '已售罄商品',
        code: 'sellOut',
        count: 0,
      },
    ],
  );

  const commons = [
    {
      img: a01,
      title: '发布商品',
      path: '',
    },
    {
      img: a02,
      title: '店铺模板',
      path: '',
    },
    {
      img: a04,
      title: '消息通知',
      path: '',
    },
    {
      img: a05,
      title: '营收概况',
      path: '',
    },
    {
      img: a07,
      title: '客户管理',
      path: '',
    },
    {
      img: a08,
      title: '交易分析',
      path: '',
    },
  ];

  const marketings = [
    {
      img: pintuan,
      title: '拼团',
      secondTitle: '拼单成团，裂变获客、促转化',
      path: '',
    },
    {
      img: kanjia,
      title: '砍价',
      secondTitle: '邀请朋友帮砍，裂变传播提销量',
      path: '',
    },
    {
      img: discountlist,
      title: '限时折扣',
      secondTitle: '商品限时打折促销',
      path: '',
    },
    {
      img: fullDiscountList,
      title: '满减满折',
      secondTitle: '满元/件优惠，提升客单价',
      path: '',
    },
    {
      img: freeExpressList,
      title: '减满邮',
      secondTitle: '购买一定金额/件数即包邮，零流失',
      path: '',
    },
    {
      img: list,
      title: '优惠券',
      secondTitle: '券动客心，营销必备',
      path: '',
    },
  ];

  /**
   * @description 跳转到地址页面
   * @param {string} url  页面地址
   */
  const handleJumpToPage = (url: string): void => {
    history.push(url);
  };

  return (
    <Scrollbars>
      <div className="situation-warpper">
        <div className="information bg-white rounded-sm shadow">
          <Row>
            {informations.map((item: IInformationItem) => {
              return (
                <Col span={6} key={item.code}>
                  <div className="information-item flex flex-col content-center justify-center text-center cursor-pointer">
                    <span>{item.count}</span>
                    <span>{item.title}</span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="common bg-white rounded-sm shadow">
          <div className="title">常用功能</div>
          <div className="content flex">
            {commons.map((item: ICommonItem) => {
              return (
                <div
                  className="common-item flex flex-col cursor-pointer"
                  key={item.title}
                >
                  <img src={`${item.img}`} alt="" />
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="marketing bg-white rounded-sm shadow">
          <div className="title">营销活动</div>
          <Row justify="space-around">
            {marketings.map((item: IMarketingItem, index: number) => {
              return (
                <Col
                  span={7}
                  className="marketing-item cursor-pointer"
                  key={index}
                >
                  <div className="flex items-center">
                    <img src={item.img} alt="" />
                    <div className="item-content flex flex-col">
                      <span>{item.title}</span>
                      <span>{item.secondTitle}</span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Scrollbars>
  );
};

export default Situation;
