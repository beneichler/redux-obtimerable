export default function (initialState, handlers) {
  return function reducer(state = initialState, action) {
    // if we have a reducer for this action, run it and return its result
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    // Otherwise just return the previous state
    return state;
  };
}
