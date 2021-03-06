//支持两层

import {
  AutoFunActionTypes,
  ActionType,
  AutoTypeAction,
  AutoTypeSonAction,
} from "../type";
const autoActionType = Symbol("action");
// 返回action函数
function generatorAction<T>(type: string, __position: string): AutoFunActionTypes<T> {
  const actionType = Symbol(type);
  const position = `${__position ? __position + "-" : ""}${type}`;
  // 接收一个val，返回新的val
  function r(val: T): ActionType<T> {
    return {
      type: actionType,
      payload: val,
      __label: autoActionType,
      __position: position,
    };
  }
  r.actionType = actionType;
  r.type = type;
  r.__position = position;
  return r;
}

/**
 *
 * @param defaultState 就是redux的值
 * @param parent
 * @returns
 * 只处理两层
 * const defaultState = { a: {c: 1, d: 4}, b: 3  }
 * 根据initState自动生成每一个aciton，对每个值生成对应的aciton
 *
 */
function autoAction<T extends Record<string, any>, U = any>(
  defaultState: T,
  index = ""
): AutoTypeAction<T> {
  const actions: AutoTypeAction<T> = {} as AutoTypeAction<T>;
  Object.keys(defaultState).map((item: keyof T) => {
    const state = defaultState[item];
    // 如果是对象，
    if (
      Object.prototype.toString.call(state) === "[object Object]" &&
      Object.keys(state).length
    ) {
      const position = `${index ? index + "-" : ""}${item}`;
      actions[item] = {} as any;
      Object.keys(state).map((key) => {
        actions[item][key] = generatorAction<T[keyof T]>(key, position as string);
      });
    } else {
      // 如果是普通值
      actions[item] = generatorAction<T[keyof T]>(
        item as string,
        index
      ) as T[keyof T] extends Record<any, any>
        ? AutoTypeSonAction<T[keyof T]>
        : AutoFunActionTypes<T[keyof T]>;
    }
  });
  return actions; //返回一个对象
}

export { autoAction, autoActionType };