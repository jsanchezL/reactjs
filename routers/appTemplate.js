const express = require ('express'),
  AppTemplateController = require ('../controllers/appTemplate'),
  multipart = require ('connect-multiparty'),
  md_auth = require ('../middleware/authenticated'),
  {UPLOAD_DIR} = require ('../config'),
  md_upload_avatar = multipart ({uploadDir: `${UPLOAD_DIR}/avatar`}),
  api = express.Router ();

api.post ('/addApp', [md_auth.ensureAuth], AppTemplateController.addApp);
api.get ('/apps', [md_auth.ensureAuth], AppTemplateController.getApps);
api.post (
  '/uploadAvatarApp',
  [md_auth.ensureAuth, md_upload_avatar],
  AppTemplateController.uploadAvatarApp
);
api.put (
  '/uploadAvatarApp/:id',
  [md_auth.ensureAuth, md_upload_avatar],
  AppTemplateController.uploadAvatarApp
);
api.put (
  '/updateApp/:id',
  [md_auth.ensureAuth],
  AppTemplateController.updateApp
);

module.exports = api;
