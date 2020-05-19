import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import ToggleSwitch from './ToggleSwitch';

momentDurationFormatSetup(moment);

const Timer = ({ timer, cycle }) => {
  const formattedTimeLeft = moment
    .duration(timer, 's')
    .format('mm:ss', { trim: false });

  return (
    <React.Fragment>
      <p className="inset timer-label">{cycle ? 'F o c u s' : 'B r e a k'}</p>
      <p className="inset timer-clock">{formattedTimeLeft}</p>
    </React.Fragment>
  );
};

export default Timer;
