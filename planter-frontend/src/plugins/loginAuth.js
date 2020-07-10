// import { createPlugin } from 'fusion-core';
// import bodyParser from 'koa-bodyparser';
// // import { SessionToken } from 'fusion-tokens';
// const { MongoClient } = require('mongodb');
// require('dotenv').config();

// const uri = process.env.uri;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const DATABASE = 'planter';

// export default createPlugin({
//   middleware() {
//     const parseBody = bodyParser();
//     return async (ctx, next) => {
//       if (ctx.path === '/login' && ctx.method === 'POST') {
//         await parseBody(ctx, () => Promise.resolve());
//         const { username, password } = ctx.request.body;
//         try {
//           await client.connect();

//           const user = await client
//             .db(DATABASE)
//             .collection('Users')
//             .findOne({ username });

//           if (!user) {
//             console.log('username is invalid!');
//             ctx.redirect('/login');
//           } else {
//             if (user.password === password) {
//               console.log('Successful Login!');
//               ctx.redirect('/');
//             } else {
//               console.log('Unsuccessful Login!');
//               ctx.redirect('/login');
//             }
//           }
//           console.log(user);
//         } catch (err) {
//           console.error(err);
//         } finally {
//           console.log('closing database');
//           await client.close();
//           console.log('database closed');
//         }
//       }
//       return next();
//     };
//   },
// });
