import React, { useState } from 'react';

const Reset = ({ reset }) => {
  // const [classState, setClassState] = useState();
  // toggleClass () {

  // }
  return (
    <React.Fragment>
      <button className="raised-btn panel-btn reset-btn" onClick={reset}>
        Reset
      </button>
    </React.Fragment>
  );
};
export default Reset;
