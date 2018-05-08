import {GET_DATA_SUCCESS} from './../actions/actionTypes'

function components(state = [], action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return action.data.modules;
    default:
      return state
  }
}

export default components
