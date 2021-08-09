import {BASE_PATH, API_VERSION} from '../api/config';
const baseUrl = `${BASE_PATH}/${API_VERSION}`;

export function makeRequests (endpoint, method, data, k, auth) {
  const url = `${baseUrl}/${endpoint}`;
  const params = {
    method: method,
    body: JSON.stringify (data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (auth) {
    params.headers['Authorization'] = auth;
  }

  if (!data) {
    delete params.body;
  }

  return fetch (url, params)
    .then (response => {
      return response.json ();
    })
    .then (result => {
      let found = Object.keys (result).includes (k);
      if (found) {
        let r = null;
        switch (k) {
          case 'tokens':
          case 'users':
            r = result[k];
            break;
          case 'user':
          default:
            r = {ok: true, message: 'Successful registration'};
            break;
        }
        return r;
      }
      return {ok: false, message: result.message};
    })
    .catch (err => {
      return {ok: false, message: err.message};
    });
}
