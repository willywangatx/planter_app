import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Grid from './Grid'

const Garden = ({ plots }) => {
  // const plotsData = plots.loading ? 'loading...' : { plots };
  const plotsData = plots
  return (
    <>
      <Grid />
      <div className="json-data">
        <p className="inset panel-label">
          Garden Data: {JSON.stringify(plotsData)}
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // gardens: state.gardens,
    plots: state.plots,
  };
};
const hoc = compose(connect(mapStateToProps));
export default hoc(Garden);

