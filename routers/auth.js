const express = require ('express'),
  AuthController = require ('../controllers/auth'),
  api = express.Router ();

api.post ('/refreshAccessToken', AuthController.refreshAccessToken);
api.get ('/confirm/:confirmationCode', AuthController.verifyUser);
api.get ('/autoSignIn/:confirmationCode', AuthController.autoSignIn);

module.exports = api;
