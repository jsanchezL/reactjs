import {makeRequests} from '../utils/utils';

export function signUpApi (data) {
  return makeRequests ('signUp', 'POST', data, 'user');
}

export function signInApi (data) {
  return makeRequests ('signIn', 'POST', data, 'tokens');
}

export function getUsersApi (token) {
  return makeRequests ('users', 'GET', null, 'users', token);
}

export function getUsersByStatusApi (token, value) {
  return makeRequests (
    `usersByStatus?active=${value}`,
    'GET',
    null,
    'users',
    token
  );
}
