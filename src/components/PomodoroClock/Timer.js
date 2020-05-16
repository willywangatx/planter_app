import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const Timer = ({ timer, cycle }) => {
  const formattedTimeLeft = moment
    .duration(timer, 's')
    .format('mm:ss', { trim: false });

  return (
    <React.Fragment>
      <div className="timer-panel raised">
        <p className="inset timer-label">{cycle ? 'Focus' : 'Break'}</p>
        <p className="inset timer-clock">{formattedTimeLeft}</p>
      </div>
    </React.Fragment>
  );
};

export default Timer;
