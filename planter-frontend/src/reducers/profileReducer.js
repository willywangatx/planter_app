import reduceReducers from 'reduce-reducers';
import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
  loading: false,
  profile: {},
  error: null,
};

// const DEFAULT_TIMER = { focusTime: 25, break_time: 5 };

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
        profile: payload,
      };
    },
    failure: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  })
);
