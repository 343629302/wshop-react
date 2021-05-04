import useAction from '@/hook/useAction';
import { makeStyles } from '@material-ui/styles';
import { forwardRef, Ref, useImperativeHandle } from 'react';
import tabIconImage from '@/assets/img/tab-icon/instantiation';
import { Modal } from 'antd';
import getEnumerateValue from '@/tools/enumerate';

//类型
export interface IRef {
  init: (val: string, path: string) => void;
}
interface IProps {
  onConfirm: Function;
}
interface IState {
  currentKey: string;
  path: string;
  show: boolean;
}

//样式
const useStyles = makeStyles({
  'tabs-icon-select-model': {
    '& .icon-item': {
      height: 43,
      width: 43,
      marginRight: 30,
      border: '1px solid #e0e0e0',
      padding: 5,
      borderRadius: 3,
      overflow: 'hidden',
      position: 'relative',
      '&.active': {
        borderColor: '#2589ff',
      },
      '& img': {
        width: '100%',
        height: '100%',
      },
      '& .triagnle-bottom': {
        position: 'absolute',
        bottom: -7,
        right: -1,
        fontSize: 24,
        color: '#2589ff',
        zIndex: 2,
      },
    },
  },
});

const TabsIconSelect = (props: IProps, ref: Ref<IRef>) => {
  const classes = useStyles();
  const initState = {
    currentKey: '',
    path: '',
    show: false,
  };
  const icons = [
    [
      {
        id: 'home',
        img: 'home-gray',
      },
      {
        id: 'classify',
        img: 'classify-gray',
      },
      {
        id: 'car',
        img: 'car-gray',
      },
      {
        id: 'user',
        img: 'user-gray',
      },
      {
        id: 'member',
        img: 'member-gray',
      },
    ],
    [
      {
        id: 'home-solid',
        img: 'home-solid-gray',
      },
      {
        id: 'classify-solid',
        img: 'classify-solid-gray',
      },
      {
        id: 'car-solid',
        img: 'car-solid-gray',
      },
      {
        id: 'user-solid',
        img: 'user-solid-gray',
      },
      {
        id: 'member-solid',
        img: 'member-solid-gray',
      },
    ],
  ];

  const { state, setState } = useAction<IState>(initState);

  useImperativeHandle(ref, () => ({
    init: handleInitModel,
  }));

  //选择图标
  const handleChangCurrent = (key: string) => {
    setState({
      currentKey: key,
    });
  };

  //初始化弹窗
  const handleInitModel = (key: string, path: string) => {
    setState({
      currentKey: key,
      path: path,
      show: true,
    });
  };

  //控制弹窗的显示隐藏
  const handleModelShow = (bool: boolean) => {
    setState({
      show: bool,
    });
  };

  //确认选择图标
  const handleSelectConfirm = () => {
    props.onConfirm(state.currentKey, state.path);
    handleModelShow(false);
  };

  return (
    <Modal
      visible={state.show}
      title="选择导航图标"
      centered
      onCancel={() => handleModelShow(false)}
      onOk={() => handleSelectConfirm()}
      maskClosable={false}
    >
      <div className={classes['tabs-icon-select-model']}>
        {icons.map((sItem, sIndex) => {
          return (
            <div key={sIndex} className="flex flex-col mb-6">
              <span className="flex-shrink-0">风格{sIndex + 1}</span>
              <div className="flex items-center mt-2">
                {sItem.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`icon-item cursor-pointer ${
                        item.id === state.currentKey ? 'active' : ''
                      }`}
                      onClick={() => handleChangCurrent(item.id)}
                    >
                      <img
                        src={getEnumerateValue(tabIconImage, item.img)}
                        alt=""
                      />
                      {item.id === state.currentKey && (
                        <span className="icon-youxiajiaogouxuan triagnle-bottom iconfont"></span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default forwardRef(TabsIconSelect);
