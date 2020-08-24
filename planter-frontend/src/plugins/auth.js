import { createPlugin } from 'fusion-core';
import { SessionToken } from 'fusion-tokens';

export default createPlugin({
  // injectable programatic api dependency
  deps: {
    Session: SessionToken,
  },
  middleware({ Session }) {
    return async (ctx, next) => {
      // plugin creates memoized instance per request using below

      // happnens before virtual dom rendering
      const session = Session.from(ctx);
      ctx['access_token'] = session.get('access_token');
      ctx['refresh_token'] = session.get('refresh_token');
      // console.log(session.access_token, session.refresh_token);

      await next();

      // happens after virtual dom rendering but before response sent to browser
      session.set('access_token', ctx['access_token']);
      session.set('refresh_token', ctx['refresh_token']);
      console.log(session);
    };
  },
});
