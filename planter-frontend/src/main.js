import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';
import Root from './root.js';
import HelmetPlugin from 'fusion-plugin-react-helmet-async';
// fusion-plugin-rpc-redux-react imports
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events';
import Redux, { ReduxToken, ReducerToken } from 'fusion-plugin-react-redux';
import RPC, { RPCToken, RPCHandlersToken } from 'fusion-plugin-rpc';
import { FetchToken } from 'fusion-tokens';
import fetch from 'unfetch';

import reducer from './reducers/index.js';
import handlers from './rpc/index.js';

export default () => {
  const app = new App(Root);
  app.register(Router);
  app.register(Styletron);
  app.register(HelmetPlugin);
  app.register(RPCToken, RPC);
  app.register(UniversalEventsToken, UniversalEvents);
  __NODE__
    ? app.register(RPCHandlersToken, handlers)
    : app.register(FetchToken, fetch);
  app.register(ReduxToken, Redux);
  app.register(ReducerToken, reducer);

  if (__NODE__) {
    const LoginPlugin = require('./plugins/login.js').default;
    app.register(LoginPlugin);
    const RegisterPlugin = require('./plugins/register').default;
    app.register(RegisterPlugin);
  }

  return app;
};
