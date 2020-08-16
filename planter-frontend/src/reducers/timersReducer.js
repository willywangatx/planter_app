import reduceReducers from 'reduce-reducers';

import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

const DEFAULT_STATE = {
  loading: false,
  error: null,
  id: null,
  focus_time: 25 * 60,
  break_time: 5 * 60,
  current_focus_time: 25 * 60,
  current_break_time: 5 * 60,
  completed_focus_counter: null,
  logged_focus_minutes: null,
  profile: null,
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
        ...payload.timers[0],
        focus_time: payload.timers[0].focus_time,
        break_time: payload.timers[0].break_time,

        // focusTime: payload.timers[0].focus_time * 60,
        // breakTime: payload.timers[0].break_time * 60,
        // add if statement for error handling for unauthroized - redirect to login
      };
    },
    failure: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  }),

  createRPCReducer('resetTimers', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        current_focus_time: state.focus_time,
        current_break_time: state.break_time,
      };
    },
    success: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: null,
        current_focus_time: payload.timers.current_focus_time,
        current_break_time: payload.timers.current_break_time,
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

  createRPCReducer('incrementFocusTime', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        focus_time: 60 + state.focus_time,
      };
    },
    success: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        loading: false,
        ...payload.timers,
        focus_time: payload.timers.focus_time,
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

  createRPCReducer('decrementFocusTime', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        focus_time:
          state.focus_time <= 60
            ? state.focus_time === 60
            : state.focus_time - 60,
      };
    },
    success: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        loading: false,
        ...payload.timers,
        focus_time: payload.timers.focus_time,
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

  createRPCReducer('incrementBreakTime', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        break_time: state.break_time + 60,
      };
    },
    success: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        ...payload.timers,
        break_time: payload.timers.break_time,
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

  createRPCReducer('decrementBreakTime', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        break_time:
          state.break_time <= 60
            ? state.break_time === 60
            : state.break_time - 60,
      };
    },
    success: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        ...payload.timers,
        break_time: payload.timers.break_time,
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
