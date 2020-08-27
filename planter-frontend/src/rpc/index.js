import { ResponseError } from 'fusion-plugin-rpc';
import { endpointToBackendLookups } from './services/index';
import { fireBackendCall } from './utils';
import responseError from 'fusion-plugin-rpc/dist-node-cjs/response-error';

const defaultHandlers = Object.keys(endpointToBackendLookups).reduce(
  (acc, endpoint) => {
    const backend = endpointToBackendLookups[endpoint];

    const handler = (args, ctx) => {
      return fireBackendCall(backend, endpoint, args, ctx)
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          responseError = new ResponseError(
            `Failure calling ${endpoint} with args ${JSON.stringify(
              args
            )} from ${backend.name}. error: ${err.message}`
          );
          console.log(responseError);
          throw responseError;
        });
    };

    acc[endpoint] = handler;
    return acc;
  },
  {}
);

export default defaultHandlers;

// export default {
//   register: async (args, ctx) => {
//     const result = await axios({
//       method: 'POST',
//       url: 'http://localhost:8000/api/register/',
//       data: args,
//     })
//       .then((res) => {
//         ctx['access_token'] = res.data.access;
//         ctx['refresh_token'] = res.data.refresh;
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     return result;
//   },

//   login: async (args, ctx) => {
//     // console.log(ctx);
//     const result = await axios({
//       method: 'POST',
//       url: 'http://localhost:8000/api/login/',
//       data: args,
//     })
//       .then((res) => {
//         ctx['access_token'] = res.data.access;
//         ctx['refresh_token'] = res.data.refresh;
//         console.log(`Logged in, refresh token: ${ctx.refresh_token}`);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Login attempt unsuccessful, erro: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   refreshAuth: async (args, ctx) => {
//     // const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     console.log(ctx.refresh_token);
//     const data = { refresh: ctx.refresh_token };
//     const result = await axios({
//       method: 'POST',
//       url: 'http://localhost:8000/api/refreshAuth/',
//       // headers,
//       data,
//     })
//       .then((res) => {
//         if (res.data.access) {
//           ctx.access_token = res.data.access;
//         }

//         if (res.data.refresh) {
//           ctx.refresh_token = res.data.refresh;
//         }
//         // if (res.data.access || res.data.refresh) {
//         //   ctx.access_token = res.data.access;
//         //   ctx.refresh_token = res.data.refresh;
//         // }

//         // console.log(res.data);
//         // return res.data;
//         return res.data;
//       })
//       .catch((err) => {
//         const responseError = new ResponseError(
//           `Auth refresh attempt unsuccessful, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   getProfile: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/getProfile/',
//     })
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => {
//         if (err.response.status === 401) {
//           // const tokenRefresh = async () => {
//           //   const result = await refreshAuth();
//           //   return result;
//           // refreshAuth(args, ctx)
//           //   .then(() => {
//           //     getProfile(args, ctx)
//           //       .then((res) => {
//           //         return res.data;
//           //       })
//           //       .catch((err) => {
//           //         const responseError = new ResponseError(
//           //           `Attempt to retrieve profile after auth refresh unsuccesful, error: ${err.message}`
//           //         );
//           //         throw responseError;
//           //       });
//           //   })
//           //   .catch((err) => {
//           //     const responseError = new ResponseError(
//           //       `Attempt to refresh auth unsuccesful, error: ${err.message}`
//           //     );
//           //     console.log(responseError);
//           //     throw responseError;
//           //   });
//         }

//         const responseError = new ResponseError(
//           `Could not load profile data, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   getWallet: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/getWallet/',
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not load wallet data, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   getTimers: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/getTimers/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         const responseError = new ResponseError(
//           `Could not load timer data, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   incrementFocusTime: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/incrementFocusTime/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not increment focus time, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   decrementFocusTime: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/decrementFocusTime/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not decrement focus time, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   incrementBreakTime: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/incrementBreakTime/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not increment break time, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   decrementBreakTime: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/decrementBreakTime/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not decrement break time, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   resetTimers: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/resetTimers/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not reset timers, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   setCycle: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/setCycle/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not set cycle, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   startTimers: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/startTimers/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not set isStarted, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   stopTimers: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/stopTimers/',
//       data: args,
//     })
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .catch((err) => {
//         console.log(err);
//         const responseError = new ResponseError(
//           `Could not set isStarted, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   // startStopToggle: async (args, ctx) => {
//   //   const headers = { Authorization: `Bearer ${ctx.access_token}` };
//   //   const result = await axios({
//   //     method: 'POST',
//   //     headers,
//   //     url: 'http://localhost:8000/api/startStopToggle/',
//   //     data: args,
//   //   })
//   //     .then((res) => {
//   //       console.log(res.data);
//   //       return res.data;
//   //     })
//   //     .catch((err) => {
//   //       const responseError = new ResponseError(
//   //         `Could not update start/stop, error: ${err.message}`
//   //       );
//   //       throw responseError;
//   //     });
//   //   return result;
//   // },

//   updateCurrentTimes: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/updateCurrentTimes/',
//       data: args,
//     })
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => {
//         const responseError = new ResponseError(
//           `Could not update current times error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },

//   updateCompletedFocusMinutes: async (args, ctx) => {
//     const headers = { Authorization: `Bearer ${ctx.access_token}` };
//     const result = await axios({
//       method: 'POST',
//       headers,
//       url: 'http://localhost:8000/api/updateCompletedFocusMinutes',
//       data: args,
//     })
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => {
//         const responseError = new ResponseError(
//           `Could not update completed focus minutes, error: ${err.message}`
//         );
//         throw responseError;
//       });
//     return result;
//   },
// };
