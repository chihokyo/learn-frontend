import { takeEvery, put, all } from 'redux-saga/effects';
import { FETCH_MULTIDATA } from './home/constants';

import { getBannersAction, getRecommendsAction } from './home/actionCreators';
import axios from 'axios';

// 1-2
function* fetchMultidata(action) {
  const res = yield axios.get('http://123.207.32.32:8000/home/multidata');
  // 1-3 内部会帮你做next()的操作，不需要用then了，saga帮你做生成器函数了

  // 因为axios get出来的是一个promise 结果直接回给res的

  const { banner, recommend } = res.data.data;

  // put(参数) saga帮你yield出去action了

  // 放入，saga内部会next迭代所有的action
  //   yield put(getBannersAction(banner.list));
  //   yield put(getRecommendsAction(recommend.list));
  // 觉得上面一个个写太麻烦了，可以直接用saga的all
  yield all([
    yield put(getBannersAction(banner.list)),
    yield put(getRecommendsAction(recommend.list)),
  ]);
}

function* saga() {
  // 1-1
  // 你想监听什么事件（action.type)，就在这里写上
  // 参数1 你想监听的action
  // 参数2 生成器函数 你想干的事情 你要在dispatch之前拦截要做的事情 主要逻辑
  yield takeEvery(FETCH_MULTIDATA, fetchMultidata);
}

// export default 必须是生成器函数
export default saga;
