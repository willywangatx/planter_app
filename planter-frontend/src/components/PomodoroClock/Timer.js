import React, { useEffect } from 'react';
// RPC REDUX
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// Timer formatter
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

const Timer = ({ currentFocusTime, currentBreakTime, currentCycle }) => {
  const timer = () => {
    if (currentCycle === 'Focus') {
      return currentFocusTime;
    }
    if (currentCycle === 'Break') {
      return currentBreakTime;
    }
  };

  const formattedTimeLeft = moment
    .duration(timer(), 's')
    .format('mm:ss', { trim: false });

  return (
    <React.Fragment>
      <p className="disable-select inset timer-clock">{formattedTimeLeft}</p>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const currentFocusTime = state.timers.current_focus_time;
  const currentBreakTime = state.timers.current_break_time;
  const currentCycle = state.timers.current_cycle;

  return {
    currentFocusTime,
    currentBreakTime,
    currentCycle,
  };
};

const hoc = compose(
  withRPCRedux('updateCurrentFocusTime'),
  connect(mapStateToProps)
);

export default hoc(Timer);
