import reduceReducers from 'reduce-reducers';

import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  id: null,
  username: null,
  email: null,
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
        ...payload.profile,
      };
    },
    failure: (state, { payload }) => {
      if (payload.data.code == 'NOT_LOGGED_IN') {
        return {
          ...state,
        };
      }
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
  })

  // createRPCReducer('login', {
  //   // what we call thunk with

  //   success: (state, { payload }) => {
  //     console.log(payload);
  //     return {
  //       ...state,
  //       authenticated: true,
  //       // TODO: how to preserve login between page refreshes?
  //     };
  //   },
  // })
);
