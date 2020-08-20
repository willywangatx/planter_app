import React, { Component, useEffect, useState } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';

import { useHistory } from 'fusion-plugin-react-router';
// import { NavLink, Link } from 'fusion-plugin-react-router';
// import paths from '../constants/paths';

const Login = ({ login }) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInput = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordInput = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login({ email, password });
    //redirect - use history
  };

  const navToLogin = () => {
    history.push(`/login`);
  };

  const navToRegister = () => {
    history.push(`/register`);
  };

  return (
    <React.Fragment>
      {/* <nav>
        <Link to={paths.home}>home.</Link>
        <NavLink activeClassName="inset" to={paths.login}>
          login.
        </NavLink>
        <Link to={paths.register}>register.</Link>
      </nav> */}
      <>
        <div className="raised-panel">
          <button className="raised-btn" onClick={navToLogin}>
            Login.
          </button>
          <button className="raised-btn" onClick={navToRegister}>
            Register.
          </button>
        </div>
        <div className="raised-panel auth-panel">
          <form onSubmit={handleLogin}>
            <div className="input-form">
              <label className="raised-panel auth-raised">Email:</label>
              <input
                className="input-box inset"
                value={email}
                onChange={handleEmailInput}
                type="text"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-form">
              <label className="raised-panel auth-raised">Password:</label>
              <input
                className="input-box inset"
                value={password}
                onChange={handlePasswordInput}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="submit-btn">
              <input className="auth-btn" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </>
    </React.Fragment>
  );
};

const rpcs = [withRPCRedux('login')];

const mapStateToProps = (state) => ({
  // auth: state.auth,
});

const hoc = compose(
  ...rpcs,
  connect(mapStateToProps)
);

export default hoc(Login);
