import {ACCESS_TOKEN, REFRESH_TOKEN} from '../utils/constants';
import jwtDecode from 'jwt-decode';
import {makeRequests} from '../utils/utils';

export function getAccessTokenApi () {
  const accessToken = localStorage.getItem (ACCESS_TOKEN);

  if (!accessToken || accessToken === 'null') {
    return null;
  }

  return willExpireToken (accessToken) ? null : accessToken;
}

export function getRefreshTokenApi () {
  const refreshToken = localStorage.getItem (REFRESH_TOKEN);

  if (!refreshToken || refreshToken === 'null') {
    return null;
  }

  return willExpireToken (refreshToken) ? null : refreshToken;
}

export async function refreshAccessTokenApi (refreshToken) {
  const result = await makeRequests (
    'refreshAccessToken',
    'POST',
    {refreshToken: refreshToken},
    'tokens'
  );
  if (!result) {
    logout ();
  } else if (Object.keys (result).includes ('ok')) {
    logout ();
    console.log (result.message);
  } else {
    const {accessToken, refreshToken} = result;
    localStorage.setItem (ACCESS_TOKEN, accessToken);
    localStorage.setItem (REFRESH_TOKEN, refreshToken);
  }
}

export function comfirmSignUpApi (confirmationCode) {
  return makeRequests (`confirm/${confirmationCode}`, 'GET', null, 'user');
}

export async function autoSignInApi (confirmationCode) {
  const result = await makeRequests (
    `autoSignIn/${confirmationCode}`,
    'GET',
    null,
    'tokens'
  );
  if (!result) {
    logout ();
    return null;
  } else if (Object.keys (result).includes ('ok')) {
    logout ();
    return result;
  } else {
    return result;
  }
}

export function logout () {
  localStorage.removeItem (ACCESS_TOKEN);
  localStorage.removeItem (REFRESH_TOKEN);
}

export function isAdmin (token) {
  const metaToken = jwtDecode (token);
  const {isAdmin} = metaToken;
  return isAdmin;
}

export function getCurrentUser (token) {
  const metaToken = jwtDecode (token);
  return metaToken;
}

/**
 * @param {*} token 
 * @returns TRUE si expiró, FALSE en otro caso.
 */
function willExpireToken (token) {
  const seconds = 60;
  const metaToken = jwtDecode (token);
  const {exp} = metaToken;
  const now = (Date.now () + seconds) / 1000;
  return now > exp;
}
