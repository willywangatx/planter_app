// import reduceReducers from 'reduce-reducers';
// import { createRPCReducer } from 'fusion-plugin-rpc-redux-react';

// // export default createRPCReducer('greet', {
// //   start: (state, action) => ({...state, loading: true}),
// //   success: (state, action) => ({...state, loading: false, greeting: action.payload.greeting}),
// //   failure: (state, action) => ({...state, loading: false, error: action.payload.error}),
// // });

// const DEFAULT_STATE = { loading: false, greeting: 'bs greeting' };

// export default reduceReducers(
//   DEFAULT_STATE,
//   createRPCReducer('greet', {
//     // what we call thunk with
//     start: (state, action) => {
//       console.log(action);
//       return { ...state, loading: true };
//     },
//     success: (state, action) => ({
//       ...state,
//       loading: false,
//       greeting: action.payload.greeting,
//     }),
//     failure: (state, action) => ({
//       ...state,
//       loading: false,
//       error: action.payload.error,
//     }),
//   })
// );
