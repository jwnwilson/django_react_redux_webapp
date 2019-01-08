import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchBlogData() {
  const json = yield fetch('/api/blog')
        .then(response => response.json(), );    
  yield put({ type: "BLOG_RECEIVED", json: json.data, });
}

function* actionWatcher() {
     yield takeLatest('GET_BLOG_DATA', fetchBlogData)
}

export default function* rootSaga() {
   yield all([
    actionWatcher(),
   ]);
}
