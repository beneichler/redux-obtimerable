import createReducer from '../redux/createReducer';
import Rx from 'rxjs';

const TIMER_MAX = 10;

// Constants
const START = 'timer:start';
const STOP = 'timer:stop';
const RESET = 'timer:reset';
const TOGGLE_AUTO = 'timer:toggleAuto';
const KEYDOWN = 'timer:keydown';
const TICK = 'timer:tick';

// Actions
export const start  = () => ({ type: START });

export const stop = kill => ({ type: STOP, kill });

export const reset = restart => ({ type: RESET, restart });

export const tick = time => ({ type: TICK, time });

export const keydown = ({ key }) => ({ type: KEYDOWN, key });

export const toggleAuto = () => ({ type: TOGGLE_AUTO });

// Epic$ <- note the Rx convention of pluralizing things with a dollar sign to indicate an observable
// tick$ does the main work of the
export const tick$ = (action$, store) =>
  action$.ofType(START)
    .concatMap(() => Rx.Observable
      .interval(1000)
      .scan(acc => acc - 1, store.getState().timer.time) // reduce over time. Using current store time as init value lets us pause and restart
      .map(n => {
        if (n >= 0) {
          return tick(n); // tick as normal
        } else if (store.getState().timer.auto) {
          return reset(true);
        }
        return stop(true); // back to the top if we've reached 0
      })
      .takeUntil(                         // Complete when we say to stop or reset
        action$.ofType(STOP)
          .merge(action$.ofType(RESET))
      )
    );

// This Epic says "if auto update is on when reset is called, also fire a start event"
export const reset$ = action$ =>
  action$.ofType(RESET)
    .filter(({ restart }) => restart) // arguably here we could actually check the state rather than passing restart, but this is the more FP way to do it
    .map(start);

// This Epic says "if the stop action happens while autoupdate is on, turn it off"
export const stop$ = action$ =>
  action$.ofType(STOP)
    .filter(({ kill }) => !kill) // see comment on the filter call in reset$
    .map(toggleAuto);

// This models the sorts of arbitrary asynchronous APIs that are usually tricky to capture in React
export const keydown$ = () =>
  Rx.Observable.fromEvent(document, 'keydown')
    .distinctUntilChanged() // only fire the event when it's not the same as the last one
    .map(keydown)



// Reducers
const getDefaultState = () => ({
  time: TIMER_MAX,
  auto: false,
  mostRecentKey: ''
});

export default createReducer(getDefaultState(), {
  [START](state) {
    return state;
  },

  [TICK](state, { time }) {
    return { ...state, time };
  },

  [STOP](state, { kill }) {
    return { ...state, auto: !kill };
  },

  [RESET](state) {
    return { ...state, time: TIMER_MAX };
  },

  [TOGGLE_AUTO](state) {
    return { ...state, auto: !state.auto };
  },

  [KEYDOWN](state, { key }) {
    return { ...state, mostRecentKey: key };
  }
});
