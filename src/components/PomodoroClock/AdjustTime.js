import React from 'react';

const AdjustTime = ({ increaseTimer, decreaseTimer, cycleLength, cycle }) => {
  const adjustLabel = cycleLength();
  return (
    <React.Fragment>
      <p className="inset" id="adjust-time-label">
        Adjust {cycle ? 'Focus' : 'Break'} Time
      </p>
      <button onClick={increaseTimer} id="increase-timer">
        {' '}
        +{' '}
      </button>
      <p className="inset" id="cycle-length">
        {adjustLabel}
      </p>
      <button onClick={decreaseTimer} id="decrease-timer">
        {' '}
        -{' '}
      </button>
    </React.Fragment>
  );
};
export default AdjustTime;
