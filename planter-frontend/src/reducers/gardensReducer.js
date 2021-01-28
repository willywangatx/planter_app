import reduceReducers from 'reduce-reducers';
import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  rows: null,
  columns: null,
  id: null,
};

export default reduceReducers(
  DEFAULT_STATE,
  createRPCReducer('getGardens', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    success: (state, { payload }) => {
      return {
        ...state,
        ...payload.garden,
        loading: false,
      };
    },
    failure: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
  }),
);
