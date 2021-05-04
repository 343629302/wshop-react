import { getPageLinkApi } from '@/api/store';
import useAction from '@/hook/useAction';
import { makeStyles } from '@material-ui/styles';
import { Modal, Tabs, Table } from 'antd';
import { forwardRef, useImperativeHandle, useEffect, Ref } from 'react';

//类型
export interface IRef {
  init: (val: IPageItem, path: string) => void;
}

interface IProps {
  onConfirm: Function;
}

interface IState {
  linkItem: IPageItem;
  path: string;
  show: boolean;
  tables: any[];
  tabKey: string;
  links: any[];
  page: number;
}

export interface IPageItem {
  name: string;
  link: string;
  groupName?: string;
}

//样式
const useStyles = makeStyles({
  'table-warpper': {
    '& .select-btn': {
      '&:hover': {
        color: '#1890ff',
      },
    },
  },
});

const Pagetableselect = (props: IProps, ref: Ref<IRef>) => {
  const { TabPane } = Tabs;
  const classes = useStyles();

  const initState = {
    linkItem: {} as IPageItem,
    path: '',
    show: false,
    tables: [],
    tabKey: '0',
    links: [],
    page: 1,
  };

  const columns = [
    {
      title: '页面名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 150,
      render: (text: any, record: IPageItem) => (
        <div>
          {record.link === state.linkItem.link ? (
            <span style={{ color: '#2589ff' }} className="font-bold">
              已选
            </span>
          ) : (
            <span
              className="cursor-pointer select-btn"
              onClick={() => handleChangeLink(record)}
            >
              选择链接
            </span>
          )}
        </div>
      ),
    },
  ];

  const { state, setState } = useAction<IState>(initState);

  useImperativeHandle(ref, () => ({
    init: handleInitModel,
  }));

  //初始化获取页面列表
  useEffect(() => {
    getAllPageLink();
  }, []);

  //tab修改时候触发,修改当前的表单数据
  useEffect(() => {
    handleTrackTabKey();
  }, [state.tabKey]);

  //获取页面链接
  const getAllPageLink = async (): Promise<void> => {
    const res = await getPageLinkApi();
    setState({
      tables: res.data,
    });
  };

  //初始化弹窗
  const handleInitModel = (val: IPageItem, path: string) => {
    setState({
      linkItem: val,
      path: path,
      show: true,
    });
    handleTrackTabKey();
  };

  //控制弹窗的显示隐藏
  const handleModelShow = (bool: boolean) => {
    setState({
      show: bool,
      tabKey: '0',
    });
  };

  //修改标签页关键字
  const handleTabChange = (key: string) => {
    setState({
      tabKey: key,
    });
  };

  //翻页时触发
  const handlePageChange = (event: number) => {
    setState({
      page: event,
    });
  };

  //根据tab来获取表单数据
  const handleTrackTabKey = () => {
    const index = parseInt(state.tabKey);
    const links = state.tables[index]?.pages;
    setState({
      links: links ? links : [],
      page: 1,
    });
  };

  //选择页面
  const handleChangeLink = (item: IPageItem) => {
    const val = Object.assign(
      {
        groupName: state.tables[parseInt(state.tabKey)].name,
      },
      item,
    );
    setState({
      linkItem: val,
    });
  };

  //确认选择页面
  const handleSelectConfirm = () => {
    props.onConfirm(state.linkItem, state.path);
    handleModelShow(false);
  };

  return (
    <Modal
      visible={state.show}
      width="800px"
      title="页面"
      centered
      onCancel={() => handleModelShow(false)}
      onOk={() => handleSelectConfirm()}
      maskClosable={false}
    >
      <Tabs
        activeKey={state.tabKey}
        type="card"
        onChange={(key) => handleTabChange(key)}
      >
        {state.tables.map((item, index) => {
          return <TabPane tab={item.name} key={index}></TabPane>;
        })}
      </Tabs>

      <div className={classes['table-warpper']}>
        <Table
          dataSource={state.links}
          columns={columns}
          className="table-border-warpper  c-paging"
          rowKey="link"
          scroll={{
            scrollToFirstRowOnChange: true,
            y: 250,
          }}
          pagination={{
            current: state.page,
            onChange: (event) => handlePageChange(event),
          }}
        />
        ;
      </div>
    </Modal>
  );
};

export default forwardRef(Pagetableselect);
