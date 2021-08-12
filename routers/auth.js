const express = require ('express');
const AuthController = require ('../controllers/auth');

const api = express.Router ();

api.post ('/refreshAccessToken', AuthController.refreshAccessToken);
api.get ('/confirm/:confirmationCode', AuthController.verifyUser);

module.exports = api;
