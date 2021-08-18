import {
  makeRequests,
  makeRequestsWithFile,
  getUrlFileFromBackend,
} from '../utils/utils';

export function addAppApi (data, token) {
  return makeRequests ('addApp', 'POST', data, 'app', token);
}

export function getAppsApi (token) {
  return makeRequests ('apps', 'GET', null, 'apps', token);
}

export function uploadAvatarAddAppApi (avatar, token) {
  return makeRequestsWithFile (
    `uploadAvatarApp`,
    'POST',
    avatar,
    'avatar',
    token
  );
}

export function uploadAvatarEditAppApi (id, avatar, token) {
  return makeRequestsWithFile (
    `uploadAvatarApp/${id}`,
    'PUT',
    avatar,
    'avatar',
    token
  );
}

export function getAvatarAppApi (avatarName, token) {
  return getUrlFileFromBackend (`getAvatar/${avatarName}`, token);
}

export function updateAppApi (id, data, token) {
  return makeRequests (`updateApp/${id}`, 'PUT', data, 'app', token);
}
