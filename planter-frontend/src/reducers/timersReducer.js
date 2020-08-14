import reduceReducers from 'reduce-reducers';

import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  timers: [{ focus_time: 25 * 60, break_time: 5 * 60 }],
};

export default reduceReducers(
  DEFAULT_STATE,
  createRPCReducer('getTimers', {
    // what we call thunk with
    start: (state) => {
      return { ...state, loading: true, error: null };
    },
    success: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        loading: false,
        ...payload,
        focus_time: payload.timers.focus_time * 60,
        break_time: payload.timers.break_time * 60,
        // add if statement for error handling for unauthroized - redirect to login
      };
    },
    failure: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  })
);
