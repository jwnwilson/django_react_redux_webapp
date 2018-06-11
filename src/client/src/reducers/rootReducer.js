import {combineReducers} from 'redux'
import apiReducer from './apiReducer'
import componentReducer from './componentReducer'

const rootReducer = combineReducers({
  components : apiReducer.components,
  header: apiReducer.header,
  footer: apiReducer.footer,
  updateComponents: componentReducer.componetUpdate
});

export default rootReducer
