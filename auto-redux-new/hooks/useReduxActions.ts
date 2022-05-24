import { useDispatch } from "react-redux";
import { AutoFunActionTypes } from "../type";

const useReduxActions = <T>(action: AutoFunActionTypes<T>) => {
  const dispatch = useDispatch();
  return [
    function (val: T) {
      dispatch(action(val));
    },
  ];
};

export { useReduxActions };
