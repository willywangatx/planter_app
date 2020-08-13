// import reduceReducers from 'reduce-reducers';

// import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

// const timers = { focus_time: 25, break_time: 5 };

// const DEFAULT_STATE = {
//   loading: false,
//   profile: { timers },
//   error: null,
// };

// export default reduceReducers(
//   DEFAULT_STATE,
//   createRPCReducer('setFocusTime', {
//     // what we call thunk with
//     start: (state) => {
//       return { ...state, loading: true };
//     },
//     success: (state, { payload }) => {
//       console.log(payload);
//       return {
//         ...state,
//         loading: false,
//         profile: payload,
//         // add if statement for error handling for unauthroized - redirect to login
//       };
//     },
//     failure: (state, { payload }) => ({
//       ...state,
//       loading: false,
//       error: payload,
//     }),
//   })
// );

// need to make handler
