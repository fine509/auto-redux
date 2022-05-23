import { AnyAction, combineReducers, Reducer } from "redux";
import { autoAction } from "./lib/autoActions";
import { autoReducer } from "./lib/autoReducers";
import { AutoTypeAction, initReducerProps, InitReducersRespronse, StateRoot } from "./type";


let autoActions;



const initReducers:initReducerProps = <T extends StateRoot>(
  defaultState: T
): InitReducersRespronse<T> => {
   autoActions = autoAction(defaultState);
  const reducers = combineReducers(autoReducer(autoActions)) as Reducer<
    any,
    AnyAction
  >;
  return {
    autoActions,
    reducers,
  };
}

export { initReducers, autoActions };
export { useReduxState, useFetchAction, useReduxActions, useAutoRedux } from "./hooks";
