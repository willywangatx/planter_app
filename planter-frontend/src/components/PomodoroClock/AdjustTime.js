import React from 'react';

const AdjustTime = ({ increaseTimer, decreaseTimer, cycleLength }) => {
  const adjustLabel = cycleLength();
  return (
    <React.Fragment>
      <button className="raised-btn" onClick={increaseTimer}>
        {' '}
        +{' '}
      </button>
      <p className="inset panel-label">{adjustLabel}</p>
      <button className="raised-btn" onClick={decreaseTimer}>
        {' '}
        -{' '}
      </button>
    </React.Fragment>
  );
};
export default AdjustTime;
