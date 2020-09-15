import { createContext } from 'react'
import { createStore } from 'redux'

// 引入全部数据文件
import reducer from './reducer'

// 参数为reducer 相当于可以查看所有数据了
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store