import React, { useState } from 'react';

const StartStop = ({ isStarted, startStopClick }) => {
  const [click, setClick] = useState(false);

  const btnClick = () => {
    setClick(!click);
  };

  const combinedClickEvents = () => {
    startStopClick();
    btnClick();
  };

  return (
    <React.Fragment>
      <button className="raised-btn" onClick={combinedClickEvents}>
        {isStarted ? 'Stop' : 'Start'}
      </button>
    </React.Fragment>
  );
};

export default StartStop;
