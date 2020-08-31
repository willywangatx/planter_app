// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import { Helmet } from 'fusion-plugin-react-helmet-async';
import { assetUrl } from 'fusion-core';
// import { Link } from 'fusion-plugin-react-router';
import paths from './constants/paths';
import Home from './pages/home';
import GardenPage from './pages/garden-page';
import PageNotFound from './pages/pageNotFound';
import Authentication from './components/Authentication/Authentication';
import AuthRoute from './components/Utils/AuthRoute';

// import Example from './components/index.js';

const Root = (
  <>
    <Helmet>
      <title>planter.</title>
      <link rel="stylesheet" href={assetUrl('./constants/styles.css')}></link>
    </Helmet>
    {/* <Authentication /> */}
    <Switch>
      <AuthRoute exact path={paths.home} component={Home} />
      {/* <Route path={paths.home} exact component={Home} /> */}
      <AuthRoute exact path={paths.garden} component={GardenPage} />
      {/* <Route path={paths.garden} exact component={GardenPage} /> */}
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default Root;
