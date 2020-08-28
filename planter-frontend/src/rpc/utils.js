import axios from 'axios';
import { ResponseError } from 'fusion-plugin-rpc';

const PASSALONG_HEADERS = ['cookie', 'content-type'];

export const fireBackendCall = (
  backend,
  endpoint,
  args,
  ctx,
  wtihRefresh = true
) => {
  const url = `${backend.basePath}/${endpoint}/`;
  // let {params, ...data} = args

  const headers = {};
  PASSALONG_HEADERS.forEach((header) => {
    headers[header] = ctx.request.header[header];
  });

  if (ctx.access_token) {
    headers.authorization = `Bearer ${ctx.access_token}`;
  }
  if (endpoint === backend.refreshEndpoint) {
    data = { refresh: ctx.refresh_token };
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      headers,
      url,
      data: args,
    })
      .then((res) => {
        if (res.data.access) {
          ctx.access_token = res.data.access;
        }
        if (res.data.refresh) {
          ctx.refresh_token = res.data.refresh;
        }
        return resolve(res.data);
      })
      .catch((err) => {
        if (wtihRefresh && err.response && err.response.status === 401) {
          // TODO: do i need to add data
          refreshAuth(backend, ctx)
            .then(() => {
              fireBackendCall(backend, endpoint, args, ctx, false)
                .then((res) => {
                  return resolve(res);
                })
                .catch((err) => {
                  const responseError = new ResponseError(
                    `Call to endpoint ${endpoint} unsuccessful after auth refresh, error: ${err.message}`
                  );
                  return reject(responseError);
                  // return reject(err)
                });
            })
            .catch((err) => {
              const responseError = new ResponseError(
                `call to endpoint ${endpoint} unsuccessful, error: ${err.message}`
              );
              return reject(responseError);
            });
        } else {
          const responseError = new ResponseError(
            `Call to endpoint ${endpoint} unsuccessful, error: ${err.message}`
          );
          return reject(responseError);
        }
      });
  });
};

const refreshAuth = (backend, ctx) => {
  console.log('attempting refresh...');
  const data = { refresh: ctx.refresh_token };
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${backend.basePath}/refreshAuth/`,
      data,
    })
      .then((res) => {
        console.log('refreshing tokens successful');
        if (res.data.access) {
          ctx.access_token = res.data.access;
        }
        if (res.data.refresh) {
          ctx.refresh_token = res.data.refresh;
        }
        return resolve(res.data);
      })
      .catch((err) => {
        const responseError = new ResponseError(
          `Attempted auth refresh unsuccessful, error: ${err.message}`
        );
        console.log(responseError);
        return reject(responseError);
      });
  });
};

// export const refreshAuth = async (ctx) => {
//   const data = { refresh: ctx.refresh_token };
//   const result = await axios({
//     method: 'POST',
//     url: 'http://localhost:8000/api/refreshAuth/',
//     data,
//   })
//     .then((res) => {
//       if (res.data.access) {
//         ctx.access_token = res.data.access;
//       }
//       if (res.data.refresh) {
//         ctx.refresh_token = res.data.refresh;
//       }
//       return res.data;
//     })
//     .catch((err) => {
//       const responseError = new ResponseError(
//         `Auth refresh attempt unsuccessful, error: ${err.message}`
//       );
//       throw responseError;
//     });
// };
