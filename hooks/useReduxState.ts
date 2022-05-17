import { useSelector as useReduxSelector, shallowEqual } from "react-redux";
import { AutoFunActionTypes, StateRoot } from "../type";
//转换后的selector可以有ts定义
const useSelector = <T = unknown>(selector: (state: StateRoot) => T): T => {
  return useReduxSelector<StateRoot, T>(selector, shallowEqual);
};

// 将type和Parent挂载在aciton上面，就可以通过useSelector精准的拿到对应的值
const useReduxState = <T>(action: AutoFunActionTypes<T>):[T] => {
  const { parent, type } = action;

  const { [type]: val } = useSelector((state) => {
    if (parent) {
      return { [type]: state[parent][type] };
    } else {
      return { [type]: state[type] };
    }
  });
  //将返回对象的值取出来
  return [val];
};

export { useReduxState };
