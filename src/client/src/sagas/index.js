import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import { put, takeLatest, all } from 'redux-saga/effects';
import { GET_BLOG_DATA, BLOG_RECEIVED } from '../actions/actionTypes';

function* fetchBlogData() {
  const json = yield fetch('/api/pages/?type=cms.BlogPage&format=json')
    .then(response => response.json());
  yield put({ type: BLOG_RECEIVED, json });
}

function* actionWatcher() {
  yield takeLatest(GET_BLOG_DATA, fetchBlogData);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
