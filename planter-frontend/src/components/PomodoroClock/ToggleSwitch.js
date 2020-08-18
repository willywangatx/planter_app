import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const ToggleSwitch = ({
  // RPC handlers
  resetTimers,
  stopTimers,
  setCycle,
  // props from global state
  timerId,
  currentCycle,
}) => {
  const toggleCycle = () => {
    setCycle({ id: timerId });
  };

  // Reset the timer and stop countdown when toggling between modes
  useEffect(() => {
    stopTimers({ id: timerId });
    resetTimers({ id: timerId });
  }, [toggleCycle]);

  return (
    <div className="toggle-container">
      <input
        className="toggle-input"
        id="toggle-switch"
        type="checkbox"
        onClick={toggleCycle}
      />
      <label
        className={
          currentCycle === 'Focus'
            ? 'focus-label toggle-label toggle-label-inset"'
            : 'break-label toggle-label toggle-label-inset"'
        }
        htmlFor="toggle-switch"
      >
        {currentCycle}
      </label>
    </div>
  );
};

const mapStateToProps = (state) => {
  const timerId = state.timers.id;
  const currentCycle = state.timers.current_cycle;
  return {
    timerId,
    currentCycle,
  };
};

const hoc = compose(
  withRPCRedux('setCycle'),
  withRPCRedux('resetTimers'),
  withRPCRedux('stopTimers'),
  connect(mapStateToProps)
);

export default hoc(ToggleSwitch);
