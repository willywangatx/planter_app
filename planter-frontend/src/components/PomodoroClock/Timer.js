import React, { useEffect } from 'react';
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
const Timer = ({
  updateCurrentFocusTime,
  currentFocusTime,
  currentBreakTime,
  currentCycle,
  timerId,
}) => {
  // useEffect(() => {
  //   if (currentCycle === 'Focus') {
  //     if (currentBreakTime !== timer()) {
  //       if (currentFocusTime > timer()) {
  //         setTimer(timer + 60);
  //       }
  //       if (currentFocusTime < timer()) {
  //         setTimer(timer - 60);
  //       }
  //     }
  //   }
  //   if (currentCycle === 'Break') {
  //     if (currentBreakTime !== timer()) {
  //       if (currentBreakTime > timer()) {
  //         setTimer(timer + 60);
  //       }
  //       if (currentBreakTime < timer()) {
  //         if (timer >= 60) {
  //           setTimer(timer - 60);
  //         }
  //         if (timer <= 60) {
  //           setTimer(0);
  //         }
  //       }
  //     }
  //   }
  // }, [currentFocusTime, currentBreakTime]);
  useEffect(() => {}, []);

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
  const timerId = state.timers.id;
  const currentFocusTime = state.timers.current_focus_time;
  const currentBreakTime = state.timers.current_break_time;
  const currentCycle = state.timers.current_cycle;

  return {
    timerId,
    currentFocusTime,
    currentBreakTime,
    currentCycle,
  };
};

const hoc = compose(
  withRPCRedux('updateCurrentFocusTime'),
  // connecting reducers to components
  connect(mapStateToProps)
);

export default hoc(Timer);
// export default PomodoroClock;
