import { Pagination } from 'antd';
import { makeStyles } from '@material-ui/styles';
interface iProps {
  current: number;
  pageChange: Function;
  total: number;
  hasSelect?: boolean;
  select?: number;
}

const useStyles = makeStyles({
  'bottom-pagination-warpper': {
    height: '100%',
    '& .left-info': {
      '& span': {
        color: '#9797a1 !important',
        paddingRight: 10,
      },
    },

    '& .ant-pagination-item-active': {
      backgroundColor: '#1890ff',
      '& a': {
        color: '#fff !important',
        fontWeight: 400,
      },
    },
  },
});

const BottomPagination = (props: iProps) => {
  const classes = useStyles();
  const handlePageChange = (page: number): void => {
    props.pageChange(page);
  };

  return (
    <div
      className={`${classes['bottom-pagination-warpper']} flex items-center justify-between`}
    >
      <div className="left-info">
        {props.hasSelect && <span>已选择{props.select}条,</span>}
        <span>总共{props.total}条</span>
        <span>当前为第{props.current}页</span>
      </div>
      <Pagination
        showQuickJumper
        showSizeChanger={false}
        total={props.total}
        current={props.current}
        onChange={(page: number) => handlePageChange(page)}
      />
    </div>
  );
};

export default BottomPagination;
