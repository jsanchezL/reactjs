const express = require ('express'),
  AuthController = require ('../controllers/auth'),
  api = express.Router ();

api.post ('/refreshAccessToken', AuthController.refreshAccessToken);
api.get ('/confirm/:confirmationCode', AuthController.verifyUser);

module.exports = api;
