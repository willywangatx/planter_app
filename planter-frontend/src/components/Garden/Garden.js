import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Garden = () => {
  const plots = [];
  return (
    <>
      <div>Garden</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const hoc = compose(connect(mapStateToProps));

export default hoc(Garden);
