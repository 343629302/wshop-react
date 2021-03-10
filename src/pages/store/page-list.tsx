import { history } from 'umi';
import { Layout, Button, Select, Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { storePageListStatus, IIteration } from '@/tools/resource';
import '@/styles/public.scss';
import useAction from '@/hook/useAction';

const pageList = () => {
  const { Footer } = Layout;
  const { Option } = Select;
  const { Search } = Input;
  const initState = {
    search: {
      status: '',
      keyWord: '',
    },
    init: '',
  };

  const { state, setState, handleInputChange } = useAction(initState);

  /**
   * @description 页面状态选择
   * @param {string} val
   */
  const handleStatusChange = (val: string) => {
    // const form = { ...state.search, status: val };
    // setState({ search: form });
  };

  /**
   * @description 关键字修改
   * @param {React} event 输入框事件
   */
  const handleKeyWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // const form = { ...state.search, keyWord: value };
    setState({
      val:value
    });
    // setState({ search: form });
  };

  /**
   * @description 搜索列表
   */
  const handleSearchList = () => {
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
                  onSelect={(val: string) => handleStatusChange(val)}
                  onClear={() => handleStatusChange('')}
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleKeyWordChange(event)
                  }
                  onSearch={() => handleSearchList()}
                />
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
      <Footer>Footer</Footer>
    </>
  );
};

export default pageList;
