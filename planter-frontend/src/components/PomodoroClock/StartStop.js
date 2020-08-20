import React, { useEffect } from 'react';

import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';

const StartStop = ({
  // RPC handlers
  startTimers,
  stopTimers,
  updateCurrentFocusTime,
  // startStopToggle,
  // global state as props
  isStarted,
  currentFocusTime,
  currentBreakTime,
  currentCycle,
  timerId,
}) => {
  const dispatch = useDispatch();
  // stops the timer when the time runs to 0
  useEffect(() => {
    if (currentFocusTime === 0 || currentBreakTime === 0) {
      stopTimers({ id: timerId });
    }
  }, [currentFocusTime, currentBreakTime]);

  // toggles the timer between start and stop
  const startStopTimer = (event) => {
    event.preventDefault();
    if (isStarted) {
      stopTimers({ id: timerId });
    }
    if (!isStarted) {
      startTimers({ id: timerId });
    }
    // startStopToggle({ id: timerId });
  };

  // TODO: be more explicit in changing the currentFocusTime and currentBreakTime?
  // maybe keep using timerDisplay - and every 20 seconds/when the timer hits 0, sync up the current times with the backend
  // so send something like updateCurrentFocusTime({id: timerId, current_focus_time: timerDisplay})
  // start or stop timer when button clicked

  // const timerDisplay = () => {
  //   currentCycle === 'Focus' ? currentFocusTime : currentBreakTime;
  // };

  useEffect(() => {
    let interval;
    if (!isStarted) {
      return clearInterval(interval);
    }
    if (isStarted) {
      interval = setInterval(() => {
        if (currentCycle === 'Focus') {
          dispatch({ type: 'DECREMENT_CURRENT_FOCUS_TIME' });
        }
        if (currentCycle === 'Break')
          dispatch({ type: 'DECREMENT_CURRENT_BREAK_TIME' });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startStopTimer]);

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
  connect(mapStateToProps),
  withRPCRedux('startTimers'),
  withRPCRedux('stopTimers'),
  // withRPCRedux('startStopToggle'),
  withRPCRedux('updateCurrentFocusTime')
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
