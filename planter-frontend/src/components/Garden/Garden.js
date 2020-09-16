import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Garden = ({ gardens }) => {
  let rows = [];
  let columns = [];

  const Grid = () => {
    for (let i = 0; i < gardens.rows; i++) {
      for (let j = 0; j < gardens.columns; j++) {
        columns[j] = < button key={[i, j]} className="disable-select raised-btn garden-col" > {j}</button>
      }
      // rows[i] = <div className="raised-panel">{columns}</div>
      rows[i] = columns;
    }
    return (
      <>
        <div className="raised-panel garden-panel">
          {rows}
        </div>
      </>
    )
  }

  const gardenData = gardens.loading ? 'loading...' : { gardens };

  return (
    <>
      {/* <div className="raised-panel">{Grid()}</div> */}
      <Grid />
      <div className="json-data">

        <p className="inset panel-label">
          Garden Data: {JSON.stringify(gardenData)}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    gardens: state.gardens,
  };
};

const hoc = compose(connect(mapStateToProps));

export default hoc(Garden);

