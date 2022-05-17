### auto-redux
根据state自动生成aciton和reducer，让你使用redux跟使用useState一样。

具体用法:
通过auto-redux提供的initReducer，将state包裹起来，传入给initReducer，返回一个```reducers```和一个```autoAtions```。
```jsx

import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "../connected-react-router/index";
import logger from "redux-logger";
import promise from "redux-promise";
import thunk from "redux-thunk";
import initReducer from "auto-redux";

import history from "./history";

const defaultState = {
  profile: {
      user: 'test',
  },
  home: 'test',
  router: {
    location: {},
    match: {},
  },
};

const { autoActions, reducers } = initReducer(defaultState);

const store = applyMiddleware(
  routerMiddleware(history),
  thunk,
  promise,
  logger
)(createStore)(reducers, defaultState);

export default store;
export { autoActions };


```

#### 连接react组件
auto-redux提供三个hooks，借助autoActions，方便连接store和组件,

```useReduxActions useReduxState useFetchAction```

useReduxActions用来派发修改store的值。
useReduxState用来获取store的值。
他们的入参都是initReducer生成的action

useFetchAction可以异步修改store的值，只需要传入想修改的aciton即可。

```jsx
import React from 'react';
import { useFetchAction, useReduxActions, useReduxState} from 'auto-redux';

import { autoActions } from './store';

function App(){
    const [home] = useReduxState(autoActions.home)
    const [setHome] = useReduxActions(autoActions.home)
    const [fn] = useFetchAction(autoActions.home, ()=>{return Promise.resolve('1')}, (data)=>{console.log(data)})

    useEffect(()=>{
        fn()
    },[])

    return <div>
        <button onClick={()=>setHome(home+1)}>{home}</button>
    </div>
}
```

目前auto-redux只支持两层数据结构，如
```js
const defaultState = {
  profile: {
      user: 'test',
  },
  home: 'test',
  router: {
    location: {},
    match: {},
  },
};

```
类似于
```js
const defaultState = {
  router: {
    location: {
        dd:123
    },
  },
};
```
类似于这种，```{dd:123}```就是一个单独的action。

