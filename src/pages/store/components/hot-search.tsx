import useAction from '@/hook/useAction';
import { Modal } from 'antd';
import { forwardRef, Ref, useEffect, useImperativeHandle, useRef } from 'react';
import Form, { IFormOpt, IRef as IFromRef } from '@/components/form';

//类型
interface IState {
  show: boolean;
  title: string;
  itemIndex: number;
}

interface IProps {
  onConfirm: (item: IHotSearchItem, index: number) => void;
}

export interface IHotSearchItem {
  key: string;
  type: string;
  highlight: string;
}

export interface IRef {
  init: (item: IHotSearchItem | undefined, index?: number) => void;
}

const HotSearch = (props: IProps, ref: Ref<IRef>) => {
  const initState = {
    show: false,
    title: '新建热词',
    itemIndex: -1,
  };
  const { state, setState } = useAction<IState>(initState);
  const formRef = useRef<IFromRef>({} as IFromRef);
  const opt: IFormOpt = {
    colums: [
      {
        label: '关键词',
        name: 'key',
        type: 'input',
        rules: [{ required: true, message: '请输入关键字' }],
        attrs: {
          placeholder: '请输入关键字',
        },
      },
      {
        label: '热词类型',
        name: 'type',
        type: 'radio',
        attrs: {
          options: [{ value: '0', label: '关键词搜索商品' }],
        },
      },
      {
        label: '热词样式',
        name: 'highlight',
        type: 'check',
        attrs: {
          options: [{ value: '1', label: '高亮' }],
        },
      },
    ],
  };
  const initForm = {
    key: '',
    type: '0',
    highlight: '0',
  };

  useImperativeHandle(ref, () => ({
    init: handleInitModel,
  }));

  useEffect(() => {
    if (!state.show) {
      formRef.current.clean();
      setState({
        itemIndex: -1,
      });
    }
  }, [state.show]);

  //初始化弹窗
  const handleInitModel = (
    item: IHotSearchItem | undefined,
    index: number = -1,
  ) => {
    const title = item ? '修改热词' : '新建热词';
    formRef.current.init(item || initForm);
    setState({
      show: true,
      itemIndex: index,
      title,
    });
  };

  //控制弹窗的显示隐藏
  const handleModelShow = (bool: boolean) => {
    setState({
      show: bool,
    });
  };

  //确认回调
  const handleConfirm = async () => {
    const val = await formRef.current.confirm();
    if (val) {
      const highlight =
        typeof val.highlight == 'string'
          ? val.highlight
          : val.highlight.length > 0
          ? val.highlight[0]
          : '0';
      const form = Object.assign({}, val, { highlight }) as IHotSearchItem;
      props.onConfirm(form, state.itemIndex);
      handleModelShow(false);
    }
  };

  return (
    <Modal
      visible={state.show}
      width="410px"
      centered
      title={state.title}
      forceRender
      onCancel={() => handleModelShow(false)}
      onOk={() => handleConfirm()}
      maskClosable={false}
    >
      <Form opt={opt} ref={formRef}></Form>
    </Modal>
  );
};

export default forwardRef(HotSearch);
