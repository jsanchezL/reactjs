import {
  makeRequests,
  makeRequestsWithFile,
  getUrlFileFromBackend,
} from '../utils/utils';

export function signUpApi (data) {
  return makeRequests ('signUp', 'POST', data, 'user');
}

export function createUserApi (data, token) {
  return makeRequests ('createUser', 'POST', data, 'user', token);
}

export function signInApi (data) {
  return makeRequests ('signIn', 'POST', data, 'tokens');
}

export function getUsersApi (token) {
  return makeRequests ('users', 'GET', null, 'users', token);
}

export function getUsersByStatusApi (values, token) {
  return makeRequests ('usersByStatus', 'POST', values, 'users', token);
}

export function uploadAvatarApi (id, avatar, token) {
  return makeRequestsWithFile (
    `uploadAvatar/${id}`,
    'PUT',
    avatar,
    'avatar',
    token
  );
}

export function getAvatarApi (avatarName, token) {
  return getUrlFileFromBackend (`getAvatar/${avatarName}`, token);
}

export function getUserApi (id, token) {
  return makeRequests (`user/${id}`, 'GET', null, 'profile', token);
}

export function getAvatarUserApi (id, token) {
  return getUrlFileFromBackend (`getAvatarUser/${id}`, token);
}

export function updateUserApi (id, data, token) {
  return makeRequests (`updateUser/${id}`, 'PUT', data, 'user', token);
}

export function deleteUserApi (id, token) {
  return makeRequests (`deleteUser/${id}`, 'DELETE', null, 'delete', token);
}
