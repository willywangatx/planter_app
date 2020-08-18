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
      ? incrementFocusTime({ id: timerId })
      : incrementBreakTime({ id: timerId });
  };

  // DECREMENT TIME
  const decreaseTimer = (event) => {
    event.preventDefault();
    currentCycle === 'Focus'
      ? decrementFocusTime({ id: timerId, min_focus_time: 1 })
      : decrementBreakTime({ id: timerId, min_break_time: 1 });
  };

  return (
    <React.Fragment>
      <button className="raised-btn" onClick={increaseTimer}>
        {' '}
        +{' '}
      </button>
      <p className="inset panel-label">{adjustTimeLabel()}</p>
      <button className="raised-btn" onClick={decreaseTimer}>
        {' '}
        -{' '}
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  //accessing store and putting it into local props for component
  const timerId = state.timers.id;
  const focusTime = state.timers.focus_time;
  const breakTime = state.timers.break_time;
  const currentCycle = state.timers.current_cycle;

  return {
    timerId,
    focusTime,
    breakTime,
    currentCycle,
  };
};

const hoc = compose(
  // gets data from browser to FE server - network request from browser get sent through all middleware
  withRPCRedux('incrementFocusTime'),
  withRPCRedux('decrementFocusTime'),
  withRPCRedux('incrementBreakTime'),
  withRPCRedux('decrementBreakTime'),
  // connecting reducers to components
  connect(mapStateToProps)
);

export default hoc(AdjustTime);
