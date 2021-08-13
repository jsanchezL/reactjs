const express = require ('express'),
  UserController = require ('../controllers/user'),
  multipart = require ('connect-multiparty'),
  md_auth = require ('../middleware/authenticated'),
  {UPLOAD_DIR} = require ('../config'),
  md_upload_avatar = multipart ({uploadDir: `${UPLOAD_DIR}/avatar`}),
  api = express.Router ();

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
api.post ('/createUser', [md_auth.ensureAuth], UserController.createUser);

module.exports = api;
