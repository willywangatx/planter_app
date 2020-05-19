import React from 'react';

const ToggleSwitch = ({ toggleCycle, cycle }) => {
  return (
    <div className="toggle-container">
      <input
        className="toggle-input"
        id="toggle-switch"
        type="checkbox"
        onClick={toggleCycle}
      />
      <label
        className="toggle-label toggle-label-inset"
        htmlFor="toggle-switch"
      >
        {cycle ? 'Focus' : 'Break'}
      </label>
    </div>
  );
};
export default ToggleSwitch;
