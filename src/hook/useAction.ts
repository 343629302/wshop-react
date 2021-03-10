import { set, setWith } from 'lodash';
import { useReducer, useState } from 'react';
import produce from 'immer';

const useAction = (props: any) => {
  // const [state, setState] = useState(props);
  function enhanceReducer (state: any,info:object)  {
    console.log(state);
    return state;
  };

  const [state, setState] = useReducer(enhanceReducer, props);


  /**
   * @description 设置状态
   * @param {object} obj 修改状态对象
   */
  const handleSetState = (val: any) => {
    const a: any = {};
    produce(a, (draft: any) => {
      set(a, 'key.val', val);
      set(a, 'key1', val);
    });
    console.log(a);
    // const newObj = Object.assign(
    //   {
    //     ...state,
    //   },
    //   obj,
    // );
    // setState(newObj);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const value = event.target.value;
    //是否一个深层的对象
    const deep = key.includes('.');
    if (!deep) {
      //如果不是深层对象直接修改
      handleSetState({
        [key]: value,
      });
    } else {
      //如果深层的对象则深层遍历修改
    }
  };

  return { state, setState, handleInputChange };
};

export default useAction;
