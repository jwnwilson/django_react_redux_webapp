import GET_API_DATA from './actionTypes'

export function getApiData(id) {
  return dispatch => fetch(`api/pages/${id}/?format=json`)
    .then(res => res.json())
    .then(
      data => dispatch({ type: 'GET_DATA_SUCCESS', data }),
      err => dispatch({ type: 'GET_DATA_FAILURE', err })
    );
}
