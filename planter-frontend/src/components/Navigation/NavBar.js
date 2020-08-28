import React from 'react';
import { Link, NavLink } from 'fusion-plugin-react-router';
import paths from '../../constants/paths';

const NavBar = () => {
  return (
    <>
      <nav>
        <NavLink activeClassName="inset" to={paths.home}>
          home.
        </NavLink>
        <Link to={paths.garden}>garden.</Link>
        <Link to={paths.market}>market.</Link>
        <Link to={paths.shed}>shed.</Link>
        <Link to={paths.tasks}>tasks.</Link>
      </nav>
    </>
  );
};

export default NavBar;
