import masterBackend from './master-backend';

const backends = [masterBackend];

export const endpointToBackendLookups = backends.reduce((acc, backend) => {
  backend.endpoints.forEach((endpoint) => {
    if (acc[endpoint]) {
      throw new Error(
        `Duplicate declaration of endpoint ${endpoint}: first in ${acc[endpoint].name}, then in ${backend.name}`
      );
    }
    // puts key into acct obj that is name of endpoint with backend object as value
    acc[endpoint] = backend;
    return acc;
  });
  return acc;
}, {});

export const endpoints = Object.keys(endpointToBackendLookups).reduce(
  (acc, key) => {
    acc[key] = key;
    return acc;
  },
  {}
);
