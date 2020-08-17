import React, { useState } from 'react';

const StartStop = ({ isStarted, startStopTimer }) => {
  const [click, setClick] = useState(false);

  const btnClick = () => {
    setClick(!click);
  };

  const combinedClickEvents = () => {
    startStopTimer();
    btnClick();
  };

  return (
    <React.Fragment>
      <button
        className="raised-btn start-stop-btn"
        onClick={combinedClickEvents}
      >
        {isStarted ? 'Stop' : 'Start'}
      </button>
    </React.Fragment>
  );
};

export default StartStop;
