import reduceReducers from 'reduce-reducers';

import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  isAuthenticated: false,
  didAttempt: false,
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
        didAttempt: true,
        // TODO: how to preserve login between page refreshes?
      };
    },
    failure: (state, { payload }) => {
      if (payload.data.code == 'NOT_LOGGED_IN') {
        return {
          ...state,
          loading: false,
          didAttempt: true,
        };
      }

      return {
        ...state,
        loading: false,
        didAttempt: true,
        error: payload,
      };
    },
  }),

  createRPCReducer('refreshAuth', {
    start: (state) => {
      return { ...state, loading: true, error: null };
    },
    success: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        didAttempt: true,
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
        didAttempt: true,
        isAuthenticated: false,
      };
    },
  }),

  // Listeners for RPC handlers to auth
  createRPCReducer('getProfile', {
    success: (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
  }),

  createRPCReducer('getTimers', {
    success: (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
  }),

  createRPCReducer('getWallet', {
    success: (state, { payload }) => {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
  })

  // create rpc reducer around getProfilee

  // createRPCReducer('register', {
  //   start: (state) => {
  //     return { ...state, loading: true, error: null };
  //   },
  //   success: (state, { payload }) => {
  //     console.log(payload);
  //     return {
  //       ...state,
  //       loading: false,
  //       isAuthenticated: true,
  //       loginAttempted: true,
  //     };
  //   },
  //   failure: (state, { payload }) => ({
  //     ...state,
  //     loading: false,
  //     loginAttempted: true,
  //     error: payload,
  //   }),
  // })
);
