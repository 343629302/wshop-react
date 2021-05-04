import { set } from 'lodash';
import { useReducer } from 'react';
import produce from 'immer';

const useAction = <T>(props: T) => {
  //useState中间处理器
  const enhanceReducer = (
    state: T,
    info: Map<string | string[], any> | Record<string, any>,
  ) => {
    return produce(state, (drafy: object) => {
      if (info instanceof Map) {
        info.forEach((val: any, key: string | string[]) => {
          set(drafy, key, val);
        });
      } else {
        for (let key in info) {
          set(drafy, key, info[key]);
        }
      }
    });
  };

  const [state, setState] = useReducer(enhanceReducer, props);

  //处理输入框输入
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    path: string | Array<string>,
  ) => {
    const value = event.target.value;
    setState(new Map([[path, value]]));
  };

  // 处理选择框选择
  const handleSelectChange = (
    event: string | number | undefined,
    path: string | Array<string>,
  ) => {
    setState(new Map([[path, event]]));
  };

  //页码改变触发
  const handlePageChange = (page: number): void => {
    setState({
      'search.page': page,
    });
  };

  return {
    state,
    setState,
    handleInputChange,
    handleSelectChange,
    handlePageChange,
  };
};

export default useAction;
