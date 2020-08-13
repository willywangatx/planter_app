import reduceReducers from 'reduce-reducers';

import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';
import { Profiler } from 'react';

const timers = { focus_time: 25, break_time: 5 };

const DEFAULT_STATE = {
  loading: false,
  error: null,
  id: null,
  username: null,
  email: null,
  timers: [{ focus_time: 25, break_time: 5 }],
};

export default reduceReducers(
  DEFAULT_STATE,
  createRPCReducer('getProfile', {
    // what we call thunk with
    start: (state) => {
      return { ...state, loading: true };
    },
    success: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        loading: false,
        ...payload.profile,
        // user: {payload.profile.id, payload.username, payload.email},
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
