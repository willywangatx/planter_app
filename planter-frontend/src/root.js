// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import { Helmet } from 'fusion-plugin-react-helmet-async';
import { assetUrl } from 'fusion-core';
import paths from './constants/paths';
import Home from './pages/home';
import GardenPage from './pages/garden-page';
import PageNotFound from './pages/pageNotFound';
// import AuthRoute from './components/Utils/AuthRoute';
// import AuthFactory from './components/Utils/AuthFactory';
import Authentication from './components/Authentication/Authentication';

const Root = (
  <>
    <Helmet>
      <title>planter.</title>
      <link rel="stylesheet" href={assetUrl('./constants/styles.css')}></link>
    </Helmet>
    <Switch>
      <Route exact path={paths.home} component={Authentication} />
      {/* <Route exact path={paths.home}>
        <AuthFactory component={Home} />
      </Route> */}

      <Route exact path={paths.garden} component={Authentication} />
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default Root;
