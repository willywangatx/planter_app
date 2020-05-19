import React from 'react';

const ToggleSwitch = ({ toggleCycle, cycle }) => {
  return (
    <div className="toggle-container">
      <button className="toggle-input" type="checkbox" onClick={toggleCycle}>
        {' '}
        {cycle ? 'Focus' : 'Break'}
      </button>
      <p className={cycle ? 'focus-mode' : 'break-mode'}>
        {cycle ? 'Focus' : 'Break'}
      </p>
    </div>
  );
};
export default ToggleSwitch;
