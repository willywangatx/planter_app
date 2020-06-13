import React from 'react';

const Cycle = ({ cycle, toggleCycle }) => {
  return (
    <React.Fragment>
      <button className="raised-btn panel-btn" onClick={toggleCycle}>
        {cycle ? 'Break' : 'Focus'}
      </button>
    </React.Fragment>
  );
};
export default Cycle;
