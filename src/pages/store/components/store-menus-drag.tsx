import { makeStyles } from '@material-ui/styles';
import { Draggable } from 'react-beautiful-dnd';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

//类型
interface IProps {
  list: iMeunItem[];
  handleMenuItemShowChange: (status: boolean, index: number) => void;
}

export interface iMeunItem {
  show: string;
  name: string;
  icon: string;
}

//样式
const useStyles = makeStyles({
  'store-menu-list': {
    '& .menus-drag-item': {
      height: 50,
      padding: '0 15px',
      borderBottom: '1px solid #E3E2E5',
      '&:nth-last-of-type(1)': {
        borderBottom: 'none',
      },
    },
  },
});

const StoreMenusDrag = (props: IProps) => {
  const classes = useStyles();

  //选择菜单是否显示
  const handleItemShowChange = (event: CheckboxChangeEvent, index: number) => {
    const status = event.target.checked;
    props.handleMenuItemShowChange(status, index);
  };

  return (
    <div className={classes['store-menu-list']}>
      {props.list.map((item, index) => {
        return (
          <Draggable key={index} draggableId={`${index}`} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="menus-drag-item flex items-center"
              >
                <Checkbox
                  checked={item.show === '1'}
                  onChange={(event) => handleItemShowChange(event, index)}
                  className="flex-shrink-0"
                ></Checkbox>
                <div className="flex-1 ml-2">{item.name}</div>
              </div>
            )}
          </Draggable>
        );
      })}
    </div>
  );
};

export default StoreMenusDrag;
