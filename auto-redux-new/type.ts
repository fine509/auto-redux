//action
interface AutoFunActionTypes<T = any> {
  (t: T): ActionType<T>;
  actionType: Symbol;
  type: string;
  __position: string;
}

// aciton函数
interface ActionType<T = unknown> {
  type: Symbol;
  payload: T;
  __label: Symbol
  __position: string
}

// 根据state生成的action对象
type AutoTypeAction<T> = {
  [key in keyof T]: T[key] extends Record<any, any>
    ?  T[key] extends{__di: any} ?   AutoFunActionTypes<T[key]> : AutoTypeAction<T[key]>  
    : AutoFunActionTypes<T[key]>;
};

// TODO 无限制的派发action
// type AutoTypeAction<T> = {
//   [key in keyof T]: T[key] extends Record<any, any>
//     ?   AutoTypeAction<T[key]>  & AutoFunActionTypes
//     : AutoFunActionTypes<T[key]>;
// };


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
  <T extends StateRoot>(defaultState: T,): InitReducersRespronse<T>;
}

 interface Action<T = any> {
  type: T
}

interface AnyAction extends Action {
  [extraProps: string]: any
}

type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S


export {
  AutoFunActionTypes,
  StateRoot,
  AutoTypeAction,
  ActionType,
  AutoTypeSonAction,
  InitReducersRespronse,
  initReducerProps,
  Action,
  Reducer,
  AnyAction,
};
