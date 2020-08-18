import reduceReducers from 'reduce-reducers';

import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  isAuthenticated: false,
  loginAttempted: false,
};

export default reduceReducers(
  DEFAULT_STATE,
  createRPCReducer('login', {
    // what we call thunk with
    start: (state) => {
      return { ...state, loading: true, error: null };
    },
    success: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        loginAttempted: true,
        // TODO: how to check if the user is authenticated?
      };
    },
    failure: (state, { payload }) => ({
      ...state,
      loading: false,
      loginAttempted: true,
      error: payload,
    }),
  })
);
