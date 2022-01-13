import { createStore, applyMiddleware, compose } from 'redux'

// 引入全部数据文件
import reducer from './reducer'
import thunk from 'redux-thunk'
// 参数为reducer 相当于可以查看所有数据了
// const store = createStore(
//     reducer, 
//     // applyMiddleware(
//     //     [   
//     //         thunk,
//     //         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     //     ]
//     // )
//     applyMiddleware(thunk)
// ) 

// 中间件的引入 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducer, enhancer)

export default store