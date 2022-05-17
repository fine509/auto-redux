//支持两层

import {
  AutoFunActionTypes,
  ActionType,
  AutoTypeAction,
  AutoTypeSonAction,
} from "../type";

// 返回action函数
function generatorAction<T>(type, parent): AutoFunActionTypes<T> {
  const actionType = Symbol(type);
  // 接收一个val，返回新的val
  function r(val): ActionType<T> {
    return {
      type: actionType,
      payload: val,
    };
  }
  r.actionType = actionType;
  r.type = type;
  r.parent = parent;
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
  parent = ""
): AutoTypeAction<T> {
  const actions: AutoTypeAction<T> = {} as AutoTypeAction<T>;
  Object.keys(defaultState).map((item) => {
    const item1 = item as keyof typeof defaultState;
    const state = defaultState[item1];
    // 如果是对象，
    if (
      Object.prototype.toString.call(state) === "[object Object]" &&
      Object.keys(state as any).length
    ) {
      actions[item1] = {} as any;

      Object.keys(state as any).map((key) => {
        actions[item][key] = generatorAction<typeof state>(key, item);
      });
    } else {
      // 如果是普通值
      actions[item1] = generatorAction<typeof state>(
        item,
        parent
      ) as T[keyof T] extends Record<any, any>
        ? AutoTypeSonAction<T[keyof T]>
        : AutoFunActionTypes<T[keyof T]>;
    }
  });
  return actions; //返回一个对象
}

export { autoAction };
