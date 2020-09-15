// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';
import { Helmet } from 'fusion-plugin-react-helmet-async';
import { assetUrl } from 'fusion-core';
import paths from './constants/paths';
import Home from './pages/home';
import Garden from './pages/garden-page';
import PageNotFound from './pages/pageNotFound';
import AuthenticatedComponentWrapperFactory from './components/Utils/AuthenticatedComponentWrapperFactory.js';

const AuthenticatedHome = AuthenticatedComponentWrapperFactory(Home);
const AuthenticatedGarden = AuthenticatedComponentWrapperFactory(Garden);

const Root = (
  <>
    <Helmet>
      <title>planter.</title>
      <link rel="stylesheet" href={assetUrl('./constants/styles.css')}></link>
    </Helmet>
    <Switch>
      <Route exact path={paths.home} component={AuthenticatedHome} />
      <Route exact path={paths.garden} component={AuthenticatedGarden} />
      <Route component={PageNotFound} />
    </Switch>
  </>
);

export default Root;

