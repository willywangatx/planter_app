import React, { useState } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';

// import { NavLink, Link } from 'fusion-plugin-react-router';
// import paths from '../constants/paths';

const Register = ({ register }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailInput = ({ target }) => {
    setEmail(target.value);
  };

  const handleUsernameInput = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordInput = ({ target }) => {
    setPassword(target.value);
  };

  // const handleConfirmPasswordInput = ({ target }) => {
  //   setConfirmPassword(target.value);
  // };

  const handleRegistration = (event) => {
    event.preventDefault();
    register({ email, username, password });
  };

  return (
    <React.Fragment>
      {/* <nav>
        <Link to={paths.home}>home.</Link>
        <Link to={paths.login}>login.</Link>
        <NavLink activeClassName="inset" to={paths.register}>
          register.
        </NavLink>
      </nav> */}
      <div className="raised-panel auth-panel">
        <form
          onSubmit={handleRegistration}
          // onSubmit={this.confirmPasswordMatch}
        >
          <div className="input-form">
            <label>Email:</label>
            <input
              className="input-box inset"
              value={email}
              onChange={handleEmailInput}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-form">
            <label>Username:</label>
            <input
              className="input-box inset"
              value={username}
              onChange={handleUsernameInput}
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-form">
            <label>Password:</label>
            <input
              className="input-box inset"
              value={password}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePasswordInput}
              required
            />
          </div>
          {/* <div className="input-form">
            <label>Confirm Password:</label>
            <input
              className="input-box inset"
              value={confirmPassword}
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordInput}
              required
            />
          </div> */}
          <div className="submit-btn">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

const rpcs = [withRPCRedux('register')];

const mapStateToProps = (state) => ({});

const hoc = compose(
  ...rpcs,
  connect(mapStateToProps)
);

export default hoc(Register);
