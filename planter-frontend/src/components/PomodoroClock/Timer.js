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
      <p className="inset timer-clock">{formattedTimeLeft}</p>
    </React.Fragment>
  );
};

export default Timer;
