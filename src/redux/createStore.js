import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import timer, { tick$, reset$, stop$, keydown$ } from '../ducks/timer';

const rootEpic = combineEpics(tick$, reset$, stop$, keydown$); // yes it has a different signature than combineReducers

const rootReducer = combineReducers({ timer });

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(epicMiddleware)
  )
);

export default store;
