import React, { useEffect } from 'react';
import { Link, NavLink } from 'fusion-plugin-react-router';

import paths from '../constants/paths';
import PomodoroClock from '../components/PomodoroClock/PomodoroClock';
import Authentication from '../components/Authentication/Authentication';

// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';

const Home = () => {
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     props.history.push('/login');
  //   }
  // });

  // try {
  //   window.herpderp = history;
  // } catch {}

  return (
    <>
      {/* <nav>
        <NavLink activeClassName="inset" to={paths.home}>
          home.
        </NavLink>
        <Link to={paths.login}>login.</Link>
        <Link to={paths.register}>register.</Link>
      </nav> */}
      {/* <PomodoroClock /> */}
      <Authentication />
    </>
  );
};

export default Home;

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.authentication.isAuthenticated,
//   };
// };

// const hoc = compose(
//   connect(mapStateToProps),
//   withRPCRedux('login'),
//   withRPCRedux('register')
// );

// export default hoc(Home);
