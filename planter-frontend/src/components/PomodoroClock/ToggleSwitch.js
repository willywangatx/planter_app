import React, { useEffect, useState } from 'react';
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
  const useDidMount = () => {
    const [didMount, setDidMount] = useState(false);
    // setting didMount to true when mounted
    useEffect(() => setDidMount(true), []);
    return didMount;
  };

  const toggleCycle = () => {
    setCycle({ id: timerId });
  };

  // TODO: when the page refreshes, the stopTimers and resetTimers RPC get called along with getProfile
  // maybe useEffect is not the correct application - don't wan't these called on initial render
  // tried using custom hook to inform useEffect below to not run on initial render, but it's still running??
  // Reset the timer and stop countdown when toggling between modes
  useEffect(() => {
    if (useDidMount) {
      stopTimers({ id: timerId });
      resetTimers({ id: timerId });
    }
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
