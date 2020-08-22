import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';

import Login from './Login';
import Register from './Register';

const renderedAuth = () => {
  const [render, setRender] = useState('Login');

  const renderOnClick = () => {
    render === 'Login' ? setRender('Register') : setRender('Login');
  };

  const renderedPage = () => {
    if (render === 'Login') {
      return <Login renderOnClick={renderOnClick} />;
    }
    if (render === 'Register') {
      return <Register renderOnClick={renderOnClick} />;
    }
  };

  return (
    <>
      <div>{renderedPage()}</div>
    </>
  );
};

const rpcs = [withRPCRedux('login'), withRPCRedux('register')];

const mapStateToProps = (state) => ({});

const hoc = compose(
  ...rpcs,
  connect(mapStateToProps)
);

export default hoc(renderedAuth);
