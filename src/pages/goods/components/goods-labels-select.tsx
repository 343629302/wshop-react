import { getGoodsLabelsApi } from '@/api/goods';
import useAction from '@/hook/useAction';
import { makeStyles } from '@material-ui/styles';
import { Modal } from 'antd';
import { forwardRef, Ref, useEffect, useImperativeHandle } from 'react';

//类型
interface IState {
  show: boolean;
  isSelect: ILablesItem[];
}

interface IProps {
  onConfrim: (labels: ILablesItem[]) => void;
}

export interface ILablesItem {
  name: string;
  id: string;
}

export interface IRef {
  init: (labels: ILablesItem[]) => void;
}

//样式
const useStyles = makeStyles({
  'goods-labels-select-model': {},
});

const GoodsLabelsSelect = (props: IProps, ref: Ref<IRef>) => {
  const classes = useStyles();
  const initState = {
    show: false,
    isSelect: [] as ILablesItem[],
  };

  const { state, setState } = useAction<IState>(initState);

  useImperativeHandle(ref, () => ({
    init: handleInitModel,
  }));

  useEffect(() => {
    getGoodsLabels();
  }, []);

  //显示弹窗
  const handleInitModel = (labels: ILablesItem[]) => {
    setState({
      isSelect: labels || [],
    });
    handleModelShow(true);
  };

  //获取商品标签
  const getGoodsLabels = async () => {
    const res = await getGoodsLabelsApi();
    console.log(res);
  };

  //控制弹窗的显示隐藏
  const handleModelShow = (bool: boolean) => {
    setState({
      show: bool,
    });
  };

  //确认选择标签
  const handleConfirm = () => {
    // props.onConfrim(state.);
    handleModelShow(false);
  };

  return (
    <Modal
      visible={state.show}
      width="900px"
      centered
      title="选择标签"
      onCancel={() => handleModelShow(false)}
      onOk={() => handleConfirm()}
      maskClosable={false}
    >
      <div className={classes['goods-labels-select-model']}>
        <div className="label-list"></div>
        <div className="select-list"></div>
      </div>
    </Modal>
  );
};

export default forwardRef(GoodsLabelsSelect);
