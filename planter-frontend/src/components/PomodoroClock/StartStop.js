import React, { useState } from 'react';

import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const StartStop = ({
  isStarted,
  currentFocusTime,
  currentBreakTime,
  currentCycle,
  timerId,
}) => {
  // TODO: figure out a way to stop timer when the cycle is toggled

  // stop the timer if time runs to 0 or switching from focus to break time
  useEffect(() => {
    if (currentFocusTime === 0 || currentBreakTime === 0) {
      // clearInterval(timerReadout);
      updateStart({ id: timerId });
      // to stop timer from changing automatically
      // setCycle(!cycle);
    }
  }, [currentFocusTime, currentBreakTime]);

  useEffect(() => {
    if (!isStarted) {
      clearInterval(timerReadout);
    }
    if (isStarted) {
      updatedTimerReadout = setInterval(() => {
        // fire call to update current focus or break time
        if (currentCycle === 'Focus') {
          //need to eventually separate the backend call to reduce the load on the server
          updateCurrentFocusTime({ id: timerId });
        }
      }, 1000);
      setTimerReadout(updatedTimerReadout);
    }
  }, [isStarted]);

  const [click, setClick] = useState(false);

  const startStopTimer = () => {
    updateStart({ id: timerId });
  };

  const btnClick = () => {
    setClick(!click);
  };

  const combinedClickEvents = () => {
    startStopTimer();
    btnClick();
  };

  return (
    <React.Fragment>
      <button
        className="raised-btn start-stop-btn"
        onClick={combinedClickEvents}
      >
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
  // gets data from browser to FE server - network request from browser get sent through all middleware
  withRPCRedux('updateStart'),
  // connecting reducers to components
  connect(mapStateToProps)
);

export default hoc(StartStop);
// export default PomodoroClock;
