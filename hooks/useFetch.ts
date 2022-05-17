import { useDispatch } from "react-redux";
import { AutoFunActionTypes } from "../type";

const useFetchACtion = <T = unknown, U = any>(
  action: AutoFunActionTypes<U>,
  fetchAction: (...args: T[]) => Promise<U>,
  cb?: (data: U, err?: Error) => void
) => {
  const dispatch = useDispatch();
  function fn(...args:  T[]) {
    fetchAction(...args)
      .then((res) => {
        // action是一个函数，返回一个对象，交给dispatch提交就行
        dispatch(action(res));
        cb && cb(res);
      })
      .catch((err) => {
        cb && cb(null, err);
      });
  }
  return [ fn ];
};

export { useFetchACtion };
