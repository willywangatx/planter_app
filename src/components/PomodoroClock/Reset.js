import React, { useState } from 'react';

const Reset = ({ resetTime }) => {
  // const [classState, setClassState] = useState();
  // toggleClass () {

  // }
  return (
    <React.Fragment>
      <button className="raised panel-btn" onClick={resetTime}>
        Reset
      </button>
    </React.Fragment>
  );
};
export default Reset;
