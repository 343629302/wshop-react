import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Button, message } from 'antd';
import { makeStyles } from '@material-ui/styles';
import HotSearch, {
  IRef as IHotRef,
  IHotSearchItem,
} from './components/hot-search';
import { useRef, useState } from 'react';
import DragContent from '@/components/drag-content';
import StoreSearchDrag from './components/store-search-drag';

//样式
const useStyles = makeStyles({
  'store-search-warpper': {
    '& > div': {
      padding: 20,
      '& > span': {
        marginTop: 7,
      },
      '& > div': {
        marginLeft: 25,
        '& .search-list': {
          marginTop: 15,
          borderRadius: 6,
          border: '1px solid #e3e2e5',
          backgroundColor: '#fff',
          maxWidth: 600,
          '& .search-header': {
            height: 50,
            fontWeight: 'bold',
            '& div': {
              padding: '0px 15px',
            },
            '& div:nth-of-type(2),& div:nth-of-type(3)': {
              width: 150,
            },
          },
        },
      },
    },
  },
});

const StoreSearch = () => {
  const { Footer } = Layout;
  const classes = useStyles();
  const hotSeachRef = useRef<IHotRef>({} as IHotRef);
  const [state, setState] = useState([] as IHotSearchItem[]);

  //显示热词搜索弹窗
  const handleHotSearchShow = (item?: IHotSearchItem, index?: number) => {
    if (!item && state.length >= 10) {
      message.destroy();
      message.error('热词上限为10个');
      return;
    }
    hotSeachRef.current.init(item, index);
  };

  //保存热词
  const handleFormConfirm = (item: IHotSearchItem, index: number) => {
    const list = [...state];
    if (index === -1) {
      list.push(item);
    } else {
      list[index] = item;
    }
    setState(list);
  };

  //拖拽完毕
  const handleDragEnd = (newIndex: number, oldIndex: number) => {
    const list = [...state];
    const item = list[oldIndex];
    list.splice(oldIndex, 1);
    list.splice(newIndex, 0, item);
    setState(list);
  };

  //删除热词
  const handleHotSearchDelete = (index: number) => {
    const list = [...state];
    list.splice(index, 1);
    setState(list);
  };

  //编辑热词
  const handleHotSearchEdit = (index: number) => {
    const item = state[index];
    handleHotSearchShow(item, index);
  };

  //保存
  const handleConfirm = () => {};

  return (
    <>
      <Scrollbars>
        <div className="public-content-warpper">
          <div className="list-header">
            <div className="page-name">搜索页</div>
          </div>
          <div
            className={`public-content-body public-bg-gray ${classes['store-search-warpper']}`}
          >
            <div className="flex">
              <span className="flex-shrink-0">搜索页热词</span>
              <div className="flex-1">
                <div className="flex items-center">
                  <Button
                    className="mr-4"
                    onClick={() => handleHotSearchShow()}
                  >
                    添加热词
                  </Button>
                  <span>热词数量上限为10个，可拖动排序</span>
                </div>
                <div className="search-list">
                  <div className="search-header flex items-center">
                    <div className="flex-1">关键词</div>
                    <div>类型</div>
                    <div>操作</div>
                  </div>
                  <DragContent
                    dragId="store-search-drag"
                    handleDragEnd={(newIndex, oldIndex) =>
                      handleDragEnd(newIndex, oldIndex)
                    }
                  >
                    <StoreSearchDrag
                      list={state}
                      onDelete={(index) => handleHotSearchDelete(index)}
                      onEdit={(index) => handleHotSearchEdit(index)}
                    ></StoreSearchDrag>
                  </DragContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
      <Footer className="public-bottom-warpper public-bottom-botton">
        <Button type="primary" onClick={() => handleConfirm()}>
          保存
        </Button>
      </Footer>
      <HotSearch
        ref={hotSeachRef}
        onConfirm={(item, index) => handleFormConfirm(item, index)}
      ></HotSearch>
    </>
  );
};

export default StoreSearch;
