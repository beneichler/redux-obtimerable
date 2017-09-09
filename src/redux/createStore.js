import { combineReducers, createStore } from 'redux';
import timer from '../ducks/timer';

const rootReducer = combineReducers({
  timer
});

const store = createStore(rootReducer);

export default store;
