import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const ToggleSwitch = ({ setCycle, timerId, currentCycle }) => {
  const toggleCycle = () => {
    setCycle({ id: timerId });
  };
  return (
    <div className="toggle-container">
      <input
        className="toggle-input"
        id="toggle-switch"
        type="checkbox"
        onClick={toggleCycle}
      />
      <label
        // className="toggle-label toggle-label-inset"
        className={
          currentCycle ? 'focus-label toggle-label' : 'break-label toggle-label'
        }
        htmlFor="toggle-switch"
      >
        {currentCycle}
      </label>
    </div>
  );
};

const mapStateToProps = (state) => {
  //accessing store and putting it into local props for component
  const timerId = state.timers.id;
  const currentCycle = state.timers.current_cycle;
  const isStarted = state.timers.is_started;

  return {
    timerId,
    currentCycle,
    isStarted,
  };
};

const hoc = compose(
  // gets data from browser to FE server - network request from browser get sent through all middleware
  withRPCRedux('setCycle'),
  // connecting reducers to components
  connect(mapStateToProps)
);

export default hoc(ToggleSwitch);
// export default PomodoroClock;
