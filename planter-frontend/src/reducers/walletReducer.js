import reduceReducers from 'reduce-reducers';
import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  profile: null,
  energy: null,
  coins: null,
  id: null,
};

export default reduceReducers(
  DEFAULT_STATE,
  createRPCReducer('getWallet', {
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
        loading: false,
        ...payload.wallet,
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

  createRPCReducer('updateEnergy', {
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
        loading: false,
        energy: payload.wallet.energy,
      };
    },
    failure: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
  })
);
