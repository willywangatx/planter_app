import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const AdjustTime = ({
  // global state props
  focusTime,
  breakTime,
  currentCycle,
  timerId,
  // RPC handlers
  incrementFocusTime,
  decrementFocusTime,
  incrementBreakTime,
  decrementBreakTime,
  currentFocusTime,
  currentBreakTime,
}) => {
  // AdjustTimeLabel
  const adjustTimeLabel = () => {
    return currentCycle === 'Focus'
      ? `Focus Time: ${focusTime / 60} min.`
      : `Break Time: ${breakTime / 60} min.`;
  };

  // INCREMENT TIME
  const increaseTimer = (event) => {
    event.preventDefault();
    currentCycle === 'Focus'
      ? incrementFocusTime({
          id: timerId,
          current_focus_time: currentFocusTime + 60,
        })
      : incrementBreakTime({
          id: timerId,
          current_break_time: currentBreakTime + 60,
        });
  };

  // DECREMENT TIME
  const decreaseTimer = (event) => {
    event.preventDefault();
    currentCycle === 'Focus'
      ? decrementFocusTime({
          id: timerId,
          min_focus_time: 300,
          current_focus_time: currentFocusTime,
        })
      : decrementBreakTime({
          id: timerId,
          min_break_time: 60,
          current_break_time: currentBreakTime,
        });
  };

  return (
    <React.Fragment>
      <button className="disable-select raised-btn" onClick={increaseTimer}>
        {' '}
        +{' '}
      </button>
      <p className="disable-select inset panel-label">{adjustTimeLabel()}</p>
      <button className="disable-select raised-btn" onClick={decreaseTimer}>
        {' '}
        -{' '}
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const timerId = state.timers.id;
  const focusTime = state.timers.focus_time;
  const breakTime = state.timers.break_time;
  const currentCycle = state.timers.current_cycle;
  const currentFocusTime = state.timers.current_focus_time;
  const currentBreakTime = state.timers.current_break_time;

  return {
    timerId,
    focusTime,
    breakTime,
    currentCycle,
    currentBreakTime,
    currentFocusTime,
  };
};

const hoc = compose(
  connect(mapStateToProps),
  withRPCRedux('incrementFocusTime'),
  withRPCRedux('decrementFocusTime'),
  withRPCRedux('incrementBreakTime'),
  withRPCRedux('decrementBreakTime')
);

export default hoc(AdjustTime);
