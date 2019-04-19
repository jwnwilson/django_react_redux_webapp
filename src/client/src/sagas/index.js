import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars
import { put, takeLatest, all } from 'redux-saga/effects';
import {
  GET_BLOG_DATA,
  BLOG_RECEIVED,
  GET_DATA_SUCCESS,
  GET_API_DATA,
} from '../actions/actionTypes';

function* fetchBlogData(action) {
  const offset = action.offset || 0;
  const limit = action.limit || 1;
  const data = yield fetch(`/api/pages/?type=cms.BlogPage&format=json&fields=description,listing_image_url&offset=${offset}&limit=${limit}`)
    .then(response => response.json());
  yield put({ type: BLOG_RECEIVED, data });
}

function* fetchApiData(action) {
  const data = yield fetch('//' + window.location.host + `/api/pages/${action.id}/?format=json`)
    .then(res => res.json());
  yield put({ type: GET_DATA_SUCCESS, data });
}

function* actionWatcher() {
  yield takeLatest(GET_BLOG_DATA, fetchBlogData);
  yield takeLatest(GET_API_DATA, fetchApiData);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
