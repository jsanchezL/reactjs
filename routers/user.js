const express = require ('express');
const UserController = require ('../controllers/user');
const multipart = require ('connect-multiparty');
const md_auth = require ('../middleware/authenticated');
const {UPLOAD_DIR} = require ('../config');
const md_upload_avatar = multipart ({uploadDir: `${UPLOAD_DIR}/avatar`});

const api = express.Router ();

api.post ('/signUp', UserController.signUp);
api.post ('/signIn', UserController.signIn);
api.get ('/users', [md_auth.ensureAuth], UserController.getUsers);
api.post (
  '/usersByStatus',
  [md_auth.ensureAuth],
  UserController.getUsersByStatus
);
api.put (
  '/uploadAvatar/:id',
  [md_auth.ensureAuth, md_upload_avatar],
  UserController.uploadAvatar
);
api.get (
  '/getAvatar/:avatarName',
  [md_auth.ensureAuth],
  UserController.getAvatar
);
api.put ('/updateUser/:id', [md_auth.ensureAuth], UserController.updateUser);
api.delete ('/deleteUser/:id', [md_auth.ensureAuth], UserController.deleteUser);

module.exports = api;
