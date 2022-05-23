import { AnyAction, Reducer } from "redux";

//action
interface AutoFunActionTypes<T = any> {
  (t: T): ActionType<T>;
  actionType: Symbol;
  type: string;
  parent: string;
}

// aciton函数
interface ActionType<T = unknown> {
  type: Symbol;
  payload: T;
}

// 根据state生成的action对象
type AutoTypeAction<T> = {
  [key in keyof T]: T[key] extends Record<any, any>
    ? AutoTypeSonAction<T[key]>
    : AutoFunActionTypes<T[key]>;
};

// aciton对象第二层
type AutoTypeSonAction<T> = {
  [key in keyof T]: AutoFunActionTypes<T[key]>;
};

// state定义
type StateRoot = {
  [key: string]: any;
};

interface InitReducersRespronse<T> {
  autoActions: AutoTypeAction<T>;
  reducers: Reducer<any, AnyAction>;
}
interface initReducerProps {
  <T extends StateRoot>(defaultState: T): InitReducersRespronse<T>;
}

export {
  AutoFunActionTypes,
  StateRoot,
  AutoTypeAction,
  ActionType,
  AutoTypeSonAction,
  InitReducersRespronse,
  initReducerProps
};
