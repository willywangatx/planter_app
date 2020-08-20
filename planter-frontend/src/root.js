// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import { Helmet } from 'fusion-plugin-react-helmet-async';
// import { Link } from 'fusion-plugin-react-router';
import paths from './constants/paths';
import Home from './pages/home.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import PageNotFound from './pages/pageNotFound.js';
import { assetUrl } from 'fusion-core';
import Authentication from './components/Authentication/Authentication';

// import Example from './components/index.js';

const Root = (
  <>
    <Helmet>
      <title>planter.</title>
      <link rel="stylesheet" href={assetUrl('./constants/styles.css')}></link>
    </Helmet>
    <Switch>
      {/* wrap each componnetnt in a login hoc */}
      <Route exact path={paths.home} component={Home} />
      {/* <Route exact path={paths.login} component={Login} />
      <Route exact path={paths.register} component={Register} /> */}
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default Root;
