import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const Timer = ({ timer }) => {
  const formattedTimeLeft = moment
    .duration(timer, 's')
    .format('mm:ss', { trim: false });

  return (
    <React.Fragment>
      <p className="inset timer-clock">{formattedTimeLeft}</p>
    </React.Fragment>
  );
};

// const Timer = ({ timer }) => {
//   let seconds = ('0' + (Math.floor(timer / 1000) % 60)).slice(-2);
//   // let seconds = (str, num) => {
//   //   return timer.toString();
//   // };
//   let minutes = ('0' + Math.floor((timer / 60000) % 60)).slice(-2);

//   return (
//     <React.Fragment>
//       {/* <p className="inset timer-clock">{formattedTimeLeft}</p> */}
//       <p className="inset timer-clock">
//         {minutes}:{seconds}
//       </p>
//     </React.Fragment>
//   );
// };

export default Timer;
