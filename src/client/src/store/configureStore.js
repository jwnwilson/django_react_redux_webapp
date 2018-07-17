import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import root from 'window-or-global';

export default function configureStore() {
  return createStore(
    rootReducer,
    root.__REDUX_DEVTOOLS_EXTENSION__ && root.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}
