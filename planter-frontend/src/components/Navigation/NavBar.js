import React from 'react';
import { NavLink, BrowserRouter } from 'fusion-plugin-react-router';
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
// import { connect } from 'react-redux';
// import { compose } from 'redux';

import paths from '../../constants/paths';

const NavBar = () => {
  return (
    <>
      <nav>
        <NavLink activeClassName="inset" exact to={paths.home}>
          home.
        </NavLink>
        <NavLink activeClassName="inset" exact to={paths.garden}>
          garden.
        </NavLink>
        <NavLink activeClassName="inset" exact to={paths.market}>
          market.
        </NavLink>
        <NavLink activeClassName="inset" exact to={paths.shed}>
          shed.
        </NavLink>
        <NavLink activeClassName="inset" exact to={paths.tasks}>
          tasks.
        </NavLink>
      </nav>
    </>
  );
};
export default NavBar;

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.authentication.isAuthenticated,
//     isStarted: state.timers.is_started,
//     currentCycle: state.timers.current_cycle,
//   };
// };

// const hoc = compose(connect(mapStateToProps));

// export default hoc(NavBar);
