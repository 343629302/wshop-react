import useAction from '@/hook/useAction';
import { iTableParams } from '@/interfaces/public';
import { Scrollbars } from 'react-custom-scrollbars';
import BottomPagination from '@/components/bottom-pagination';
import { Layout, Input, Button } from 'antd';
import { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import GoodsLabelsSelect, {
  ILablesItem,
  IRef as IGoodsLabelsRef,
} from './components/goods-labels-select';

//类型
interface iState {
  search: iTableParams;
  tableList: Record<string, any>[];
  tableTotal: number;
}

//样式
const useStyles = makeStyles({
  'goods-list-warpper': {
    '& .public-search-warpper': {
      alignItems: 'flex-start !important',
      '& .labels-list': {
        padding: '10px 0px',
      },
    },
  },
});

const GoodsList = () => {
  const { Footer } = Layout;
  const { Search } = Input;
  const classes = useStyles();
  const goodsLabelsRef = useRef<IGoodsLabelsRef>({} as IGoodsLabelsRef);
  const initState: iState = {
    search: {
      types: [] as String[],
      keyWord: '',
      page: 1,
      size: 10,
    },
    tableList: [],
    tableTotal: 50,
  };

  const { state, setState, handlePageChange, handleInputChange } = useAction(
    initState,
  );

  useEffect(() => {
    // console.log(state);
  }, [state.search.page]);

  //搜索列表
  const handleSearchList = () => {};

  //选择标签弹窗显示
  const handleLabelsSelectShow = () => {
    goodsLabelsRef.current.init(state.search.types);
  };

  //选择标签
  const handleLabelsSelect = (labels: ILablesItem[]) => {
    console.log(labels);
  };

  return (
    <>
      <Scrollbars>
        <div
          className={`public-content-warpper ${classes['goods-list-warpper']}`}
        >
          <div className="list-header">
            <div className="page-name">商品列表</div>
          </div>
          <div className="public-content-body public-bg-gray">
            <div className="public-search-warpper flex-col">
              <div className="key-input">
                <Search
                  placeholder="请输入商品名称"
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
              <div className="labels-list">
                <span className="mr-3">商品标签</span>
                <Button type="primary">不限</Button>
                <Button onClick={() => handleLabelsSelectShow()}>
                  添加标签
                </Button>
              </div>
              <div className="quick-operation"></div>
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

      <GoodsLabelsSelect
        onConfrim={(labels) => handleLabelsSelect(labels)}
        ref={goodsLabelsRef}
      ></GoodsLabelsSelect>
    </>
  );
};

export default GoodsList;
