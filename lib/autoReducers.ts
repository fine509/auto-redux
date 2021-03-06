import { AutoTypeAction } from "../type";
import { autoActionType } from "./autoActions";

function generatorReducer(
  currentAction: any,
  index: string,
  state = {} as any,
  action = {} as any
) {
  const { payload, type, __position = "", __label } = action;
  if (__label !== autoActionType) {
    return state;
  }
  if (typeof currentAction === "function") {
    if (currentAction.actionType === type) {
      return payload;
    }
    return state;
  } else {
    // state {location: {}, match: {}}
    //里面一层，redux对于拆分的reducer会通过state[key]将该reducer对应的状态返回

    // 性能优化
    if (!__position) {
      return state;
    }

    const arr = Object.keys(currentAction);

    // 性能优化
    const firstLevel = __position.split("-")[index];
    if (!firstLevel || !arr.includes(firstLevel)) {
      return state;
    }

    for (let i = 0; i < arr.length; i++) {
      const key = arr[i];
      // 如果是一个对象，找到对应的属性，返回新的对象，里面对应要修改的属性已经修改
      if (currentAction[key].actionType === type) {
        return {
          ...state,
          [key]: payload,
        };
      }
    }
    return state;
  }
}

/**
 *
 * @param actions 根据state生成的actions对象
 * @returns
 * 根据acitons对象自动生成reducer
 */
function autoReducer<T>(actions: AutoTypeAction<T>) {
  const reducers: any = {};
  Object.keys(actions).map((item) => {
    const currentAction = (actions as any)[item];
    // reducer，接收state和aciton，action需要使用autoActions生产的action才行
    reducers[item] = generatorReducer.bind(null, currentAction, 1);
  });
  return reducers;
}

export { autoReducer };
