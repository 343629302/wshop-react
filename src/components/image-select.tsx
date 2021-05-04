import useAction from '@/hook/useAction';
import { makeStyles } from '@material-ui/styles';
import { Modal, Input, Empty, Pagination } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, Ref } from 'react';
import { iTableParams } from '@/interfaces/public';
import { Scrollbars } from 'react-custom-scrollbars';
import { getMaterialGalleryApi } from '@/api/public';
import { Check } from 'react-feather';

//类型
interface IState {
  show: boolean;
  path: string;
  search: iTableParams;
  imageList: IImageItem[];
  activeImage: string;
}

interface IProps {
  onConfrim: (image: string, path: string) => void;
}

interface IImageItem {
  title: string;
  format: string;
  image: string;
  width: number;
  height: number;
}

export interface IRef {
  init: (path: string) => void;
}

//样式
const useStyles = makeStyles({
  'image-icon-select-model': {
    '& .image-warpper': {
      height: 400,
      marginRight: -10,
      '& .image-list': {
        display: 'grid',
        paddingRight: 10,
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridColumnGap: 10,
        gridRowGap: 10,
        marginTop: 20,
        '& .image-item': {
          width: '100%',
          height: 160,
          borderRadius: 5,
          overflow: 'hidden',
          border: '1px solid #e3e2e5',
          cursor: 'pointer',
          position: 'relative',
          '&:hover': {
            '& .image-info': {
              display: 'flex',
            },
          },
          '&>div': {
            position: 'relative',
            '& img': {
              height: 120,
              width: '100%',
              objectFit: 'cover',
            },
            '& .image-info': {
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              background: 'linear-gradient(-180deg,transparent,rgba(0,0,0,.5))',
              height: 30,
              padding: '0 10px',
              display: 'none',
              '& span': {
                color: '#fff',
              },
            },
            '& .image-format': {
              color: '#bbb',
              marginLeft: 5,
            },
          },
          '& .is-active': {
            display: 'none',
          },
          '&.active': {
            '& .is-active': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.6)',
            },
            '& .image-info': {
              opacity: 0,
            },
          },
        },
      },
    },
    '& .pagination': {
      textAlign: 'right',
    },
  },
});

const ImageSelect = (props: IProps, ref: Ref<IRef>) => {
  const classes = useStyles();
  const { Search } = Input;
  const initState = {
    show: false,
    path: '',
    search: {
      keyWord: '',
      page: 1,
      size: 10,
    },
    imageList: [],
    activeImage: '',
  };

  const { state, setState, handleInputChange } = useAction<IState>(initState);

  useImperativeHandle(ref, () => ({
    init: handleInitModel,
  }));

  useEffect(() => {
    getMaterialGalleryList();
  }, [state.search.page]);

  //显示弹窗
  const handleInitModel = (path: string) => {
    setState({
      path: path,
    });
    handleModelShow(true);
  };

  //控制弹窗的显示隐藏
  const handleModelShow = (bool: boolean) => {
    setState({
      show: bool,
      'search.page': 1,
      activeImage: '',
    });
  };

  //获取图像素材列表
  const getMaterialGalleryList = async () => {
    const res = await getMaterialGalleryApi();
    setState({
      imageList: res.data,
    });
  };

  //改变图片列表页码
  const handlePageChange = (event: number) => {
    setState({
      'search.page': event,
    });
  };

  //改变当前已选图片
  const handleImageChange = (image: string) => {
    setState({
      activeImage: image,
    });
  };

  //确认选择图片
  const handleConfirm = () => {
    props.onConfrim(state.activeImage, state.path);
    handleModelShow(false);
  };

  return (
    <Modal
      visible={state.show}
      width="900px"
      centered
      title="选择图片"
      onCancel={() => handleModelShow(false)}
      onOk={() => handleConfirm()}
      maskClosable={false}
    >
      <div className={classes['image-icon-select-model']}>
        <div className="search-header flex flex-row-reverse">
          <Search
            placeholder="请输入图片名称"
            style={{ width: 250 }}
            enterButton="搜索"
            size="middle"
            value={state.search.keyWord}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(event, ['search', 'keyWord'])
            }
            onSearch={() => getMaterialGalleryList()}
          />
        </div>
        <div className="image-warpper my-3">
          {state.imageList.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <Scrollbars>
              <ul className="image-list">
                {state.imageList.map((item, index) => {
                  return (
                    <li
                      className={`image-item flex flex-col ${
                        state.activeImage === item.image ? 'active' : ''
                      }`}
                      key={index}
                      onClick={() => handleImageChange(item.image)}
                    >
                      <div>
                        <img src={item.image} alt="" />
                        <div className="items-center justify-between image-info">
                          <span>
                            {item.width} x {item.height}
                          </span>
                          <span>格式：{item.format}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex items-center px-4">
                        <span>{item.title}</span>
                        <span className="image-format">({item.format})</span>
                      </div>
                      <div className="is-active">
                        <Check color="#fff" size={40}></Check>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Scrollbars>
          )}
        </div>
        <div className="pagination">
          <Pagination
            current={state.search.page}
            className="c-paging"
            onChange={(event) => handlePageChange(event)}
            total={state.imageList.length}
          />
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(ImageSelect);
