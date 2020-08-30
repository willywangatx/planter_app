import React from 'react';
import { Link, NavLink } from 'fusion-plugin-react-router';
import paths from '../../constants/paths';

const NavBar = () => {
  // const activePath = () => {

  // }

  return (
    <>
      <nav>
        <NavLink activeClassName="inset" exact to={paths.home}>
          home.
        </NavLink>
        <NavLink activeClassName="inset" to={paths.garden}>
          garden.
        </NavLink>
        <NavLink activeClassName="inset" to={paths.market}>
          market.
        </NavLink>
        <NavLink activeClassName="inset" to={paths.shed}>
          shed.
        </NavLink>
        <NavLink activeClassName="inset" to={paths.tasks}>
          tasks.
        </NavLink>
        {/* <Link to={paths.home}>home.</Link>
        <Link to={paths.garden}>garden.</Link>
        <Link to={paths.market}>market.</Link>
        <Link to={paths.shed}>shed.</Link>
        <Link to={paths.tasks}>tasks.</Link> */}
      </nav>
    </>
  );
};

export default NavBar;
