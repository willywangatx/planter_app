import { createPlugin } from 'fusion-core';
import bodyParser from 'koa-bodyparser';

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const DATABASE = 'planter';

export default createPlugin({
  middleware() {
    const parseBody = bodyParser();
    return async (ctx, next) => {
      if (ctx.path === '/register' && ctx.method === 'POST') {
        await parseBody(ctx, () => Promise.resolve);
        const { email, username, password } = ctx.request.body;
        console.log(email, username, password);
        try {
          // await client.connect();

          const checkEmail = await client
            .db(DATABASE)
            .collection('Users')
            .findOne({ email });
          const checkUsername = await client
            .db(DATABASE)
            .collection('Users')
            .findOne({ username });

          if (checkEmail) {
            console.log('Email already exists');
            ctx.body = { status: 'Email already exists' };
            ctx.redirect('/register');
          }
          if (checkUsername) {
            console.log('Username already exists');
            ctx, (body = { status: 'Username already exists' });
            ctx.redirect('/register');
          }

          if (!checkEmail && !checkUsername) {
            const newUser = await client
              .db(DATABASE)
              .collection('Users')
              .insertOne({ email, username, password });

            console.log(newUser.ops);
            ctx.redirect('/login');
          }
        } catch (err) {
          console.error(err);
        } finally {
          await client.close();
          console.log('Database closed');
        }
      }
      return next();
    };
  },
});
