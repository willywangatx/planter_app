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
  current_cycle: 'Focus',
  is_started: false,
  completed_focus_minutes: 0,
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

        // TODO: add if statement for error handling for unauthroized - redirect to login
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
      const newTimer = { ...payload.timers };
      delete newTimer.current_cycle;
      delete newTimer.current_focus_time;
      delete newTimer.current_break_time;
      delete newTimer.is_started;
      return {
        ...state,
        loading: false,
        error: null,
        ...newTimer,
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
        current_focus_time: state.current_focus_time + 60,
      };
    },
    success: (state, { payload }) => {
      console.log(payload);
      const newTimer = { ...payload.timers };
      delete newTimer.current_focus_time;
      // delete newTimer.current_break_time;
      // delete newTimer.current_cycle;
      return {
        ...state,
        loading: false,
        ...newTimer,
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
        current_focus_time:
          state.current_focus_time <= 60
            ? state.current_focus_time === 0
            : state.current_focus_time - 60,
      };
    },
    success: (state, { payload }) => {
      console.log(payload);
      const newTimer = { ...payload.timers };
      delete newTimer.current_focus_time;
      return {
        ...state,
        loading: false,
        ...newTimer,
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
        current_break_time: state.current_break_time + 60,
      };
    },
    success: (state, { payload }) => {
      const newTimer = { ...payload.timers };
      delete newTimer.current_focus_time;
      return {
        ...state,
        loading: false,
        ...newTimer,
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
        current_break_time:
          state.current_break_time <= 60
            ? state.current_break_time === 0
            : state.current_break_time - 60,
      };
    },
    success: (state, { payload }) => {
      const newTimer = { ...payload.timers };
      delete newTimer.current_focus_time;
      return {
        ...state,
        loading: false,
        ...newTimer,
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

  createRPCReducer('setCycle', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        current_cycle: state.current_cycle === 'Focus' ? 'Break' : 'Focus',
      };
    },
    success: (state, { payload }) => {
      const newTimer = { ...payload.timers };
      delete newTimer.current_focus_time;
      delete newTimer.current_break_time;
      delete newTimer.is_started;
      return {
        ...state,
        loading: false,
        error: null,
        ...newTimer,
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

  createRPCReducer('startTimers', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        is_started: true,
      };
    },
    success: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        is_started: payload.timers.is_started,
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

  createRPCReducer('stopTimers', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        is_started: false,
      };
    },
    success: (state, { payload }) => {
      const newTimer = { ...payload.timers };
      delete newTimer.current_cycle;
      delete newTimer.current_focus_time;
      delete newTimer.current_break_time;
      delete newTimer.is_started;
      return {
        ...state,
        loading: true,
        ...newTimer,
      };
    },
    error: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
  }),

  // FE only state change for current time
  (state, action) => {
    switch (action.type) {
      case 'DECREMENT_CURRENT_FOCUS_TIME':
        return {
          ...state,
          current_focus_time: state.current_focus_time - 1,
        };
      case 'DECREMENT_CURRENT_BREAK_TIME':
        return {
          ...state,
          current_break_time: state.current_break_time - 1,
        };
      default:
        return state;
    }
  },

  createRPCReducer('updateCompletedFocusMinutes', {
    start: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        completed_focus_minutes:
          state.focus_time / 60 + state.completed_focus_minutes,
      };
    },
    success: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        completed_focus_minutes: payload.timers.completed_focus_minutes,
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

// createRPCReducer('startStopToggle', {
//   start: (state) => {
//     return {
//       ...state,
//       loading: true,
//       error: null,
//       is_started: !state.is_started,
//     };
//   },
//   success: (state, { payload }) => {
//     return {
//       ...state,
//       loading: false,
//       is_started: payload.timers.is_started,
//     };
//   },
//   failure: (state, { payload }) => {
//     return {
//       ...state,
//       loading: false,
//       error: payload,
//     };
//   },
// }),

// createRPCReducer('updateCurrentFocusTime', {
//   start: (state) => {
//     return {
//       ...state,
//       loading: true,
//       error: null,
//       current_focus_time: state.current_focus_time - 60,
//     };
//   },
//   success: (state, { payload }) => {
//     return {
//       ...state,
//       loading: false,
//       current_focus_time: payload.timers.current_focus_time,
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
