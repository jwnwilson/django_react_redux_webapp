import {
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  GET_BLOG_DATA,
  COMPONENT_UPDATED,
  COMPONENT_NEEDS_UPDATE,
} from './actionTypes';

export function getApiData(id) {
  return dispatch => fetch('//' + window.location.host + `/api/pages/${id}/?format=json`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: GET_DATA_SUCCESS, data }),
      err => dispatch({ type: GET_DATA_FAILURE, err }),
    );
}

export function updateComponent() {
  return { type: COMPONENT_NEEDS_UPDATE };
}

export function componentUpdated() {
  return { type: COMPONENT_UPDATED };
}

export function getApiBlogData() {
  return { type: GET_BLOG_DATA };
}
