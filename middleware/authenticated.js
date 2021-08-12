const jwt = require ('jwt-simple');
const moment = require ('moment');
const {SECRET_KEY} = require ('../config');
const User = require ('../models/user');

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status (403).send ({message: 'No auth'});
  }
  const token = req.headers.authorization.replace (/['"]+/g, '');
  try {
    var payload = jwt.decode (token, SECRET_KEY);
    if (payload.ext <= moment.unix ()) {
      return res.status (404).send ({message: 'The token expired'});
    }
  } catch (ex) {
    console.log (ex);
    return res.status (404).send ({message: 'Token invalid'});
  }
  req.user = payload;
  next ();
};
