import { makeStyles } from '@material-ui/styles';
import { IRouter } from '@/interfaces/layout';
import { Scrollbars } from 'react-custom-scrollbars';
interface ISecondItem {
  label: string;
  list: IRouter[];
}

interface IProps {
  secondNavList: IRouter[];
  secondNavCurrentPath: string;
  handleSeondNavChange: Function;
}

const useStyles = makeStyles({
  //二级路由
  'layout-second-nav': {
    padding: 10,
    paddingRight: 0,
    width: 130,
    '& .second-item': {
      fontSize: 12,
      paddingRight: 15,
      '& .second-item-title': {
        padding: '15px 10px',
        fontWeight: 'bold',
      },
      '& .second-item-list': {
        '& > div': {
          padding: '13px 10px',
          cursor: 'pointer',
          position: 'relative',
          '&.active': {
            color: '#35323b',
            background: '#e9eaf0',
            borderRadius: 6,
            '& .triangle': {
              borderColor: 'transparent transparent transparent #000',
              borderStyle: 'solid',
              borderWidth: '4px 0 4px 6px',
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
            },
          },
        },
      },
      '& .line': {
        margin: '12px 10px',
        height: 1,
        backgroundColor: '#e3e2e5',
      },
    },
  },
});

const SecondNav = (props: IProps) => {
  const classes = useStyles();
  if (props.secondNavList.length > 0) {
    const list: ISecondItem[] = [];
    //遍历出部件数组
    props.secondNavList.forEach((item: IRouter) => {
      const index = list.findIndex(
        (lItem: ISecondItem) => lItem.label === item.label,
      );
      if (index === -1) {
        list.push({
          label: item.label,
          list: [item],
        });
      } else {
        list[index].list.push(item);
      }
    });
    return (
      <div className={classes['layout-second-nav']}>
        <Scrollbars>
          {list.map((item: ISecondItem) => {
            return (
              <div className="second-item" key={item.label}>
                <div className="second-item-title">{item.label}</div>
                <div className="second-item-list">
                  {item.list.map((lItem: IRouter) => {
                    return (
                      <div
                        key={lItem.path}
                        className={
                          props.secondNavCurrentPath === lItem.path
                            ? 'active'
                            : ''
                        }
                        onClick={() => props.handleSeondNavChange(lItem.path)}
                      >
                        <span>{lItem.title}</span>
                        <span className="triangle"></span>
                      </div>
                    );
                  })}
                </div>
                <div className="line"></div>
              </div>
            );
          })}
        </Scrollbars>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SecondNav;
