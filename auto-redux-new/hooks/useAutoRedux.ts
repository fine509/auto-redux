import { AutoFunActionTypes } from "../type";
import { useReduxActions } from "./useReduxActions";
import { useReduxState } from "./useReduxState";

const useAutoRedux = <T>(
  action: AutoFunActionTypes<T>
): [T, (val: T) => void] => {
  const [val] = useReduxState(action);
  const [setVal] = useReduxActions(action);
  return [val, setVal]
};


export { useAutoRedux }