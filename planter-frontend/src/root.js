// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import { Helmet } from 'fusion-plugin-react-helmet-async';
// import { Link } from 'fusion-plugin-react-router';
import paths from './constants/paths';
import Home from './pages/home';
import GardenPage from './pages/garden-page';
import PageNotFound from './pages/pageNotFound';
import { assetUrl } from 'fusion-core';

// import Example from './components/index.js';

const Root = (
  <>
    <Helmet>
      <title>planter.</title>
      <link rel="stylesheet" href={assetUrl('./constants/styles.css')}></link>
    </Helmet>
    <Switch>
      <Route path={paths.home} exact component={Home} />
      <Route path={paths.garden} exact component={GardenPage} />
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default Root;
