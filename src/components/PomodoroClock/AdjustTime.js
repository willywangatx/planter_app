import React from 'react';

const AdjustTime = ({ increaseTimer, decreaseTimer, cycleLength, cycle }) => {
  const adjustLabel = cycleLength();
  return (
    <React.Fragment>
      <br />
      <br />
      <p id="adjust-time-label">Adjust {cycle ? 'Focus' : 'Break'} Time</p>
      <button onClick={increaseTimer} id="increase-timer">
        {' '}
        +{' '}
      </button>
      <p id="cycle-length">{adjustLabel}</p>
      <button onClick={decreaseTimer} id="decrease-timer">
        {' '}
        -{' '}
      </button>
    </React.Fragment>
  );
};
export default AdjustTime;

//   let cycleLengthLabel = cycle
//     ? `Focus Time: ${moment.duration(focusTime, 's').minutes()} min.`
//     : `Break Time: ${moment.duration(breakTime, 's').minutes()} min.`;

//   let cycleLength = cycle
//     ? moment.duration(focusTime, 's').minutes()
//     : moment.duration(breakTime, 's').minutes;

//   let cycleLabel = cycle ? 'Focus Time: ' : 'Break Time: ';

//   let cycleLengthLabel = () => {
//     useEffect(() => {
//       if (cycle) {
//         setTimer(focusTime);
//         return `Focus Time: ${moment.duration(focusTime, 's').minutes()} min`;
//       } else if (!cycle) {
//         setTimer(breakTime);
//         return `Break Time: ${moment.duration(breakTime, 's').minutes()}`;
//       }
//     }, [timer]);
//   };
