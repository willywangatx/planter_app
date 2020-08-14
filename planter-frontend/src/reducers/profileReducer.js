import reduceReducers from 'reduce-reducers';

import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const timers = { focus_time: 25, break_time: 5 };

const DEFAULT_STATE = {
  loading: false,
  error: null,
  id: null,
  username: null,
  email: null,
  timers: [{ focus_time: 25 * 60, break_time: 5 * 60 }],
};

export default reduceReducers(
  DEFAULT_STATE,
  createRPCReducer('getProfile', {
    // what we call thunk with
    start: (state) => {
      return { ...state, loading: true, error: null };
    },
    success: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        loading: false,
        // transform data to seconds for timers here - list out on FE
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

  //

  // createRPCReducer('updateProfile', {
  //   start: (state) => {
  //     return { ...state, loading: true };
  //   },
  //   success: (state, { payload }) => {
  //     console.log(payload);
  //     return {
  //       ...state,
  //       loading: false,
  //       ...payload.profile,
  //     };
  //   },
  //   failure: (state, { payload }) => {
  //     return {
  //       ...state,
  //       loading: false,
  //       error: payload,
  //     };
  //   },
  // })
);
