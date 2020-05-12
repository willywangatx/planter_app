import React from 'react';

const Cycle = ({ cycle, toggleCycle }) => {
  return (
    <React.Fragment>
      <button id="toggleCycle" onClick={toggleCycle}>
        {cycle ? 'Break' : 'Focus'}
      </button>
    </React.Fragment>
  );
};
export default Cycle;
