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
  walletId,
  focusTime,
}) => {
  const dispatch = useDispatch();
  // stops the timer when the time runs to 0

  useEffect(() => {
    // if (currentFocusTime === 0 || currentBreakTime === 0) {
    //   stopTimers({ id: timerId });
    // }
    if (currentFocusTime === 0) {
      stopTimers({ id: timerId });
      updateCompletedFocusMinutes({ id: timerId });
      updateEnergy({ id: walletId, focus_time: focusTime });
    }

    if (currentBreakTime === 0) {
      stopTimers({
        id: timerId,
      });
    }
  }, [currentFocusTime, currentBreakTime]);

  // toggles the timer between start and stop
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
  const walletId = state.wallet.id;
  const focusTime = state.timers.focus_time;

  return {
    isStarted,
    currentFocusTime,
    currentBreakTime,
    timerId,
    currentCycle,
    walletId,
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
