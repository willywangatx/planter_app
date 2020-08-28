import React, { useEffect } from 'react';

import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';

const StartStop = ({
  // RPC handlers
  startTimers,
  stopTimers,
  updateEnergy,
  updateCompletedFocusMinutes,

  // global state props
  isStarted,
  currentFocusTime,
  currentBreakTime,
  currentCycle,
  timerId,
  updateCurrentTimes,
  focusTime,
}) => {
  const dispatch = useDispatch();

  // UPDATE BACKEND WITH CURRENT TIME EVERY 10 SECONDS WHEN isStarted
  // TODO: current times that are passed to BE are not changing every 10 sec - is the same

  // useEffect(() => {
  //   let interval;
  //   if (!isStarted) {
  //     return clearInterval(interval);
  //   }
  //   if (isStarted) {
  //     interval = setInterval(() => {
  //       updateCurrentTimes({
  //         id: timerId,
  //         current_focus_time: currentFocusTime,
  //         current_break_time: currentBreakTime,
  //       });
  //     }, 10000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isStarted]);

  // TIMER LOGIC WHEN TIME REACHES ZERO
  useEffect(() => {
    if (currentFocusTime === 0) {
      stopTimers({ id: timerId });
      updateCompletedFocusMinutes({ id: timerId });
      updateEnergy({ focus_time: focusTime });
    }

    if (currentBreakTime === 0) {
      stopTimers({
        id: timerId,
      });
    }
  }, [currentFocusTime, currentBreakTime]);

  // START AND STOP TIMER LOGIC
  const startStopTimer = (event) => {
    event.preventDefault();
    if (isStarted) {
      stopTimers({ id: timerId });
      updateCurrentTimes({
        id: timerId,
        current_focus_time: currentFocusTime,
        current_break_time: currentBreakTime,
      });
    }
    if (!isStarted) {
      startTimers({ id: timerId });
    }
  };

  // TIMER SECONDS COUNTDOWN LOGIC
  // TODO: ask why there is a return clear interval needed in the if (isStarted) block??
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
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startStopTimer]);

  return (
    <React.Fragment>
      <button
        className="disable-select raised-btn start-stop-btn"
        onClick={startStopTimer}
      >
        {isStarted ? 'Stop' : 'Start'}
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const isStarted = state.timers.is_started;
  const currentFocusTime = state.timers.current_focus_time;
  const currentBreakTime = state.timers.current_break_time;
  const timerId = state.timers.id;
  const currentCycle = state.timers.current_cycle;
  const focusTime = state.timers.focus_time;

  return {
    isStarted,
    currentFocusTime,
    currentBreakTime,
    timerId,
    currentCycle,
    focusTime,
  };
};

const hoc = compose(
  connect(mapStateToProps),
  withRPCRedux('startTimers'),
  withRPCRedux('stopTimers'),
  withRPCRedux('updateCurrentTimes'),
  withRPCRedux('updateCompletedFocusMinutes'),
  withRPCRedux('updateEnergy')
);

export default hoc(StartStop);
