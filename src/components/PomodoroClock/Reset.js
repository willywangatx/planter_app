import React from 'react';

const Reset = ({ resetTime }) => {
  return (
    <React.Fragment>
      <button id="reset" onClick={resetTime}>
        Reset
      </button>
    </React.Fragment>
  );
};
export default Reset;
