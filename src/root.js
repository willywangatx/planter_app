// @flow
import React from 'react';
import { Route, Switch } from 'fusion-plugin-react-router';

import Home from './pages/home.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import PageNotFound from './pages/pageNotFound.js';

const root = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route component={PageNotFound} />
  </Switch>
);

export default root;
