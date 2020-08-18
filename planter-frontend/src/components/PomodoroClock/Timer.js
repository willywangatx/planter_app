import React from 'react';
// RPC REDUX
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// Timer formatter
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

/////// Original component ////////
// const Timer = ({  timer }) => {
//   const formattedTimeLeft = moment
//     .duration(timer, 's')
//     .format('mm:ss', { trim: false });

//   return (
//     <React.Fragment>
//       <p className="inset timer-clock">{formattedTimeLeft}</p>
//     </React.Fragment>
//   );
// };

// NEW componenet
const Timer = ({ currentFocusTime, currentBreakTime, currentCycle }) => {
  const timer = () => {
    if (currentCycle === 'Focus') {
      // timer = currentFocusTime;
      return currentFocusTime;
    }
    if (currentCycle === 'Break') {
      // timer = currentBreakTime;
      return currentBreakTime;
    }
  };

  const formattedTimeLeft = moment
    .duration(timer(), 's')
    .format('mm:ss', { trim: false });

  return (
    <React.Fragment>
      <p className="inset timer-clock">{formattedTimeLeft}</p>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  // const timerId = state.timers.id;
  // const focusTime = state.timers.focus_time;
  // const breakTime = state.timers.break_time;
  const currentFocusTime = state.timers.current_focus_time;
  const currentBreakTime = state.timers.current_break_time;
  const currentCycle = state.timers.current_cycle;

  return {
    // timerId,
    // focusTime,
    // breakTime,
    currentFocusTime,
    currentBreakTime,
    currentCycle,
  };
};

const hoc = compose(
  // withRPCRedux('getProfile'),
  // withRPCRedux('getTimers'),
  // withRPCRedux('incrementFocusTime'),
  // withRPCRedux('decrementFocusTime'),
  // withRPCRedux('incrementBreakTime'),
  // withRPCRedux('decrementBreakTime'),
  // withRPCRedux('resetTimers'),
  // withRPCRedux('setCycle'),
  // connecting reducers to components
  connect(mapStateToProps)
);

export default hoc(Timer);
// export default PomodoroClock;
