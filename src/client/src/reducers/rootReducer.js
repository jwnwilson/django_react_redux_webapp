import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import componentReducer from './componentReducer';

const rootReducer = combineReducers({
  components: apiReducer.components,
  header: apiReducer.header,
  footer: apiReducer.footer,
  updateComponents: componentReducer.componetUpdate,
  blogs: apiReducer.blogs,
});

export default rootReducer;
