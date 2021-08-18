const AppTemplate = require ('../models/appTemplate'),
  fs = require ('fs'),
  path = require ('path'),
  log4js = require ('log4js'),
  logger = log4js.getLogger (),
  {UPLOAD_DIR, LOG_LEVEL} = require ('../config');

function getApps (req, res) {
  AppTemplate.find ().then (apps => {
    if (!apps) {
      res.status (404).send ({message: 'We not found apps in system'});
    } else {
      res.status (200).send ({apps});
    }
  });
}

function addApp (req, res) {
  const app = new AppTemplate ();
  app.name = req.body.name;
  app.description = req.body.description;
  app.isSecure = req.body.isSecure;
  app.typePlatform = req.body.typePlatform;
  app.versionAPI = req.body.versionAPI;
  app.avatar = req.body.avatar;

  app.save ((err, appStored) => {
    if (err) {
      res
        .status (500)
        .send ({message: 'Exists other app with same type platform'});
      logger.debug (err);
    } else {
      if (!appStored) {
        res.status (404).send ({message: 'Error when created app'});
      } else {
        res.status (200).send ({
          app: appStored,
          isUpdate: false,
          message: 'App was registered successfully!',
        });
      }
    }
  });
}

function uploadAvatarApp (req, res) {
  const {id} = req.params;
  if (!id) {
    if (req.files) {
      let filePath = req.files.avatar.path;
      let fileSplit = filePath.split ('/');
      let fileName = fileSplit[2];
      let extSplit = fileName.split ('.');
      let fileExt = extSplit[1].toLowerCase ();
      if (fileExt !== 'png' && fileExt !== 'jpg' && fileExt !== 'jpeg') {
        res.status (403).send ({
          message: 'The image type is not valid!, Allow jpeg, jpg, png',
        });
      } else {
        res.status (200).send ({avatar: fileName});
      }
    }
  } else {
    console.log ('UploadAvatar para App registrada');
  }
}

module.exports = {
  addApp,
  getApps,
  uploadAvatarApp,
};
