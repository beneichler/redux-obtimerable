import createReducer from '../redux/createReducer';

const START = 'timer:start';
const STOP = 'timer:stop';
const TICK = 'timer:tick';

const getDefaultState = () => ({
  time: 0
});

export default createReducer(getDefaultState(), {
  [START](state) {
    return state;
  },

  [STOP]() {
    return getDefaultState();
  }
});
