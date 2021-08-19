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
          case 'apps':
          case 'profile':
            r = result[k];
            break;
          case 'user':
          case 'app':
            if (!result.isUpdate) {
              r = {ok: true, message: result.message};
            } else {
              r = {ok: true, message: 'Success'};
            }
            break;
          case 'delete':
            r = {ok: true, message: result.message};
            break;
          default:
            r = {ok: true, message: 'Success'};
            break;
        }
        return r;
      }
      return {ok: false, message: result.message};
    })
    .catch (err => {
      console.log (err);
      return {ok: false, message: err.message};
    });
}

export function makeRequestsWithFile (endpoint, method, data, k, auth) {
  const url = `${baseUrl}/${endpoint}`;
  const formData = new FormData ();
  formData.append (k, data, data.name);
  const params = {
    method: method,
    body: formData,
    headers: {
      Authorization: auth,
    },
  };

  return fetch (url, params)
    .then (response => {
      return response.json ();
    })
    .then (result => {
      let found = Object.keys (result).includes (k);
      if (found) {
        let r = null;
        switch (k) {
          case 'avatar':
          case 'file':
            r = result[k];
            break;
          default:
            r = {ok: true, message: 'Successful'};
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

export function getUrlFileFromBackend (endpoint, auth) {
  const url = `${baseUrl}/${endpoint}`;
  const params = {
    headers: {
      Authorization: auth,
    },
  };

  return fetch (url, params)
    .then (response => {
      return response.blob ();
    })
    .catch (err => {
      return {ok: false, message: err.message};
    });
}
