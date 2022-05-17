/**
 *
 * @param actions 根据state生成的actions对象
 * @returns
 * 根据acitons对象自动生成reducer
 */
function autoReducer(actions) {
  const reducers: any = {};
  Object.keys(actions).map((item) => {
    const current = actions[item];
    // reducer，接收state和aciton，action需要使用autoActions生产的action才行
    reducers[item] = (state = null, action) => {
      const { payload, type } = action;
      //只有一层，直接新数据即可
      if (typeof current === "function") {
        if (current.actionType === type) {
          //判断传入的aciton跟自动生成的aciton是否同一个
          return payload;
        }
        // 不是同一个不处理，返回state
        return state;
      } else {
        //里面一层，redux对于拆分的reducer会通过state[key]将该reducer对应的状态返回
        const arr = Object.keys(current);
        for (let i = 0; i < arr.length; i++) {
          const key = arr[i];

          // 如果是一个对象，找到对应的属性，返回新的对象，里面对应要修改的属性已经修改
          if (current[key].actionType === type) {
            return {
              ...state,
              [key]: payload,
            };
          }
        }

        //找不到不处理
        return state;
      }
    };
  });
  return reducers;
}

export { autoReducer };
