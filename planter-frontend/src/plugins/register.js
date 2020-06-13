import { createPlugin } from 'fusion-core';
import bodyParser from 'koa-bodyparser';
import axios from 'axios';

export default createPlugin({
  middleware() {
    const parseBody = bodyParser();
    return async (ctx, next) => {
      if (ctx.path == '/register' && ctx.method == 'POST') {
        await parseBody(ctx, () => Promise.resolve);
        console.log(ctx.request.body);

        axios({
          method: 'POST',
          url: 'http://localhost:8000/accounts/create/',
          data: ctx.request.body,
        })
          .then((res) => {
            ctx.body = res;
            // if res.status === 201
            // redirect to homepage
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return next();
    };
  },
});
