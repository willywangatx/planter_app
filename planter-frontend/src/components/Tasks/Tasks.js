// import React, { useEffect } from 'react';
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';

// const Tasks = {};

// const mapStateToProps = (state) => {
//   //accessing store and putting it in variable
//   // accessing data in store  - called a reducer
//   const profileLoading = state.profile.loading;
//   const profileError = state.profile.error;
//   const profileData = state.profile;
//   const tasks = state.profile.tasks;

//   // const focusTime = state.profile.profile.timers[0].focus_time;

//   return {
//     profileLoading,
//     profileError,
//     profileData,
//     tasks,
//   };
// };

// const hoc = compose(
//   // gets data from browser to FE server - network request from browser get sent through all middleware
//   withRPCRedux('getProfile'),
//   withRPCRedux('setFocusTime'),
//   // connecting reducers to components
//   connect(mapStateToProps)
// );

// export default hoc(PomodoroClock);
// // export default PomodoroClock;
