import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchBlogData() {
  const json = yield fetch('/api/blog/?format=json')
    .then(response => response.json());
  yield put({ type: 'BLOG_RECEIVED', json });
}

function* actionWatcher() {
  yield takeLatest('GET_BLOG_DATA', fetchBlogData);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
