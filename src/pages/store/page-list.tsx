import { history } from 'umi';
import { Layout, Button, Select, Input, Table } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { storePageListStatus, IIteration, getKeyValue } from '@/tools/resource';
import useAction from '@/hook/useAction';
import { getStorePageListApi } from '@/api/store';
import { useEffect } from 'react';
import BottomPagination from '@/components/bottom-pagination';
import { iTableParams } from '@/interfaces/public';

//类型
interface iState {
  search: iTableParams;
  tableList: Record<string, any>[];
  tableTotal: number;
}

const StorePageList = () => {
  const { Footer } = Layout;
  const { Option } = Select;
  const { Search } = Input;
  const initState: iState = {
    search: {
      status: undefined,
      keyWord: '',
      page: 1,
      size: 10,
    },
    tableList: [],
    tableTotal: 0,
  };

  const columns: object[] = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="font-bold">{name}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span>{getKeyValue(status, storePageListStatus)}</span>
      ),
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, item: any) => (
        <>
          <Button type="link" className="table-action-padding-0">
            编辑
          </Button>
          {item.status === '0' && (
            <Button type="link" className="table-action-padding-0">
              发布
            </Button>
          )}
          <Button type="link" className="table-action-padding-0">
            复制
          </Button>
        </>
      ),
    },
  ];

  const {
    state,
    setState,
    handleInputChange,
    handleSelectChange,
    handlePageChange,
  } = useAction(initState);

  useEffect(() => {
    getStorePageList();
  }, [state.search.page]);

  //获取店铺页面数据
  const getStorePageList = async (): Promise<void> => {
    const res = await getStorePageListApi(state.search);
    setState({
      tableList: res.data,
    });
  };

  //搜索列表
  const handleSearchList = (): void => {
    console.log(state);
  };

  return (
    <>
      <Scrollbars>
        <div className="public-content-warpper">
          <div className="list-header">
            <div className="page-name">页面列表</div>
          </div>
          <div className="public-content-body public-bg-gray">
            <div className="public-search-warpper">
              <div className="left">
                <Button>新建页面</Button>
                <Select
                  allowClear
                  placeholder="全部状态"
                  style={{ width: 150 }}
                  value={state.search.status}
                  onSelect={(val) =>
                    handleSelectChange(val, ['search', 'status'])
                  }
                  onClear={() =>
                    handleSelectChange(undefined, ['search', 'status'])
                  }
                >
                  {storePageListStatus.map((item: IIteration) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="right">
                <Search
                  placeholder="请输入页面名称"
                  style={{ width: 250 }}
                  enterButton="搜索"
                  size="middle"
                  value={state.search.keyWord}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event, ['search', 'keyWord'])
                  }
                  onSearch={() => handleSearchList()}
                />
              </div>
            </div>
            <div className="public-table-warpper">
              <Table
                dataSource={state.tableList}
                columns={columns}
                rowKey="id"
                pagination={{
                  position: [],
                }}
              />
            </div>
          </div>
        </div>
      </Scrollbars>
      <Footer className="public-bottom-warpper">
        <BottomPagination
          current={state.search.page}
          pageChange={(page: number) => handlePageChange(page)}
          total={state.tableTotal}
        ></BottomPagination>
      </Footer>
    </>
  );
};

export default StorePageList;
