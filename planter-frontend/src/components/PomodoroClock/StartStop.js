import React, { useState } from 'react';

import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const StartStop = ({
  // RPC handlers
  startTimers,
  stopTimers,
  updateCurrentFocusTime,
  startStopToggle,
  // global state as props
  isStarted,
  currentFocusTime,
  currentBreakTime,
  currentCycle,
  timerId,
}) => {
  // stops the timer when the time runs to 0
  useEffect(() => {
    if (currentFocusTime === 0 || currentBreakTime === 0) {
      // clearInterval(timerReadout);
      stopTimers({ id: timerId });
    }
  }, [currentFocusTime, currentBreakTime]);

  useEffect(() => {
    if (isStarted) {
      // clearInterval(**put the timer readout here)
    }
    if (!isStarted) {
    }
  }, [isStarted]);

  const startStopTimer = (event) => {
    event.preventDefault();
    startStopToggle({ id: timerId });
  };

  return (
    <React.Fragment>
      <button className="raised-btn start-stop-btn" onClick={startStopTimer}>
        {isStarted ? 'Stop' : 'Start'}
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  //accessing store and putting it into local props for component
  const isStarted = state.timers.is_started;
  const currentFocusTime = state.timers.current_focus_time;
  const currentBreakTime = state.timers.current_break_time;
  const timerId = state.timers.id;
  const currentCycle = state.timers.current_cycle;

  return {
    isStarted,
    currentFocusTime,
    currentBreakTime,
    timerId,
    currentCycle,
  };
};

const hoc = compose(
  withRPCRedux('startTimers'),
  withRPCRedux('stopTimers'),
  withRPCRedux('startStopToggle'),
  withRPCRedux('updateCurrentFocusTime'),

  connect(mapStateToProps)
);

export default hoc(StartStop);

// useEffect(() => {
//   let initiateTimer;
//   if (currentCycle === 'Focus') {
//     if (isStarted) {
//       const initiateTimer = setInterval(() => {
//         updateCurrentFocusTime({ id: timerId });
//       }, 1000);
//     }
//     if (!isStarted) {}
//   }
// }, [isStarted]);

// useEffect(() => {
//   if (!isStarted) {
//     clearInterval(timerReadout);
//   }
//   if (isStarted) {
//     updatedTimerReadout = setInterval(() => {
//       // fire call to update current focus or break time
//       if (currentCycle === 'Focus') {
//         //need to eventually separate the backend call to reduce the load on the server
//         updateCurrentFocusTime({ id: timerId });
//       }
//     }, 1000);
//     setTimerReadout(updatedTimerReadout);
//   }
// }, [isStarted]);

// const [click, setClick] = useState(false);

// const btnClick = () => {
//   setClick(!click);
// };

// const combinedClickEvents = () => {
//   startStopTimer();
//   btnClick();
// };
