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
      <p className="inset timer-label">{cycle ? 'Focus' : 'Break'}</p>
      <p className="inset timer">{formattedTimeLeft}</p>
    </React.Fragment>
  );
};

export default Timer;