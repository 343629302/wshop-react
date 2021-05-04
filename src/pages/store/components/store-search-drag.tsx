import { makeStyles } from '@material-ui/styles';
import { IHotSearchItem } from './hot-search';
import { Draggable } from 'react-beautiful-dnd';
import getEnumerateValue from '@/tools/enumerate';
import { Button } from 'antd';

//类型
interface IProps {
  list: IHotSearchItem[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

//样式
const useStyles = makeStyles({
  'store-search-list': {
    '& .search-item': {
      height: 50,
      borderTop: '1px solid #E3E2E5',
      '& div': {
        padding: '0px 15px',
      },
      '& div:nth-of-type(2),& div:nth-of-type(3)': {
        width: 150,
      },
    },
  },
});

const StoreSearchDrag = (props: IProps) => {
  const classes = useStyles();
  const types = {
    '0': '关键字搜索商品',
  };
  return (
    <div className={classes['store-search-list']}>
      {props.list.map((item, index) => {
        return (
          <Draggable key={index} index={index} draggableId={`${index}`}>
            {(provided, snapshot) => (
              <div
                className="search-item flex items-center"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="flex-1">{item.key}</div>
                <div>{getEnumerateValue(types, item.type)}</div>
                <div>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => props.onEdit(index)}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => props.onDelete(index)}
                  >
                    删除
                  </Button>
                </div>
              </div>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

export default StoreSearchDrag;
