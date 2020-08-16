import React from 'react';

const ToggleSwitch = ({ toggleCycle, currentCycle }) => {
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
        {currentCycle === 'Focus' ? 'Focus' : 'Break'}
      </label>
    </div>
  );
};
export default ToggleSwitch;
