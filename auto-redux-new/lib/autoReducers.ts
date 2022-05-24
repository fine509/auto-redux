import { autoActionType } from "./autoActions";

function generatorReducer(currentAction, index, state = {}, action = {} as any) {
  const { payload, type, __position = "", __label } = action;
  if (__label !== autoActionType) {
    return state;
  }
  //只有一层，直接新数据即可
  if (typeof currentAction === "function") {
    if (currentAction.actionType === type) {
      //判断传入的aciton跟自动生成的aciton是否同一个
      return payload;
    }
    return state;
  } else {
    // state {location: {}, match: {}}
    //里面一层，redux对于拆分的reducer会通过state[key]将该reducer对应的状态返回

    // 性能优化
    if(!__position){
      return state
    }

    const arr = Object.keys(currentAction);


    // 性能优化
    const firstLevel = __position.split("-")[index];
    if (firstLevel && !arr.includes(firstLevel)) {
      return state;
    }

    const copyState = { ...state };
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i];
      copyState[key] = generatorReducer(
        currentAction[key],
        index + 1,
        state[key],
        action
      );
    }
    return copyState;
  }
}

/**
 *
 * @param actions 根据state生成的actions对象
 * @returns
 * 根据acitons对象自动生成reducer
 */
function autoReducer(actions) {
  const reducers: any = {};
  Object.keys(actions).map((item) => {
    const currentAction = actions[item];
    // reducer，接收state和aciton，action需要使用autoActions生产的action才行
    reducers[item] = generatorReducer.bind(null, currentAction, 1);
  });
  return reducers;
}

export { autoReducer };
