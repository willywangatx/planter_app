import React, { useState } from 'react';

const Reset = ({ resetTime }) => {
  // const [classState, setClassState] = useState();
  // toggleClass () {

  // }
  return (
    <React.Fragment>
      <button className="raised-btn panel-btn reset-btn" onClick={resetTime}>
        Reset
      </button>
    </React.Fragment>
  );
};
export default Reset;
