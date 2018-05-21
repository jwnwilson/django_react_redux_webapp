import {combineReducers} from 'redux'
import apiReducer from './apiReducer'

const rootReducer = combineReducers({
  components : apiReducer.components,
  header: apiReducer.header,
  footer: apiReducer.footer
});

export default rootReducer
