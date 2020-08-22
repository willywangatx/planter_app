import React, { useState } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';

// import { useHistory } from 'fusion-plugin-react-router';

const Login = ({ login, renderOnClick }) => {
  // const history = useHistory();
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
  };

  // const navToLogin = () => {
  //   history.push(`/login`);
  // };

  return (
    <React.Fragment>
      <>
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
              <input
                className="raised-btn auth-btn"
                type="submit"
                value="Login"
              />
              <p className="" onClick={renderOnClick}>
                Don't have an account? Go to register page.
              </p>
            </div>
          </form>
        </div>
      </>
    </React.Fragment>
  );
};

const rpcs = [withRPCRedux('login'), withRPCRedux('register')];

const mapStateToProps = (state) => ({
  // auth: state.auth,
});

const hoc = compose(
  ...rpcs,
  connect(mapStateToProps)
);

export default hoc(Login);
