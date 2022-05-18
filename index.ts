import { AnyAction, combineReducers, Reducer } from "redux";
import { autoAction } from "./lib/autoActions";
import { autoReducer } from "./lib/autoReducers";
import { AutoTypeAction, StateRoot } from "./type";

interface InitReducersRespronse<T> {
  autoActions: AutoTypeAction<T>;
  reducers: Reducer<any, AnyAction>;
}

function initReducers<T extends StateRoot>(
  defaultState: T
): InitReducersRespronse<T> {
  const autoActions = autoAction(defaultState);
  const reducers = combineReducers(autoReducer(autoActions)) as Reducer<
    any,
    AnyAction
  >;
  return {
    autoActions,
    reducers,
  };
}

export { initReducers };
export { useReduxState, useFetchAction, useReduxActions, useAutoRedux } from "./hooks";
