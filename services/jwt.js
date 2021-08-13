const jwt = require ('jwt-simple'),
  jsonwebtoken = require ('jsonwebtoken'),
  moment = require ('moment'),
  {SECRET_KEY} = require ('../config');

exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
    createToken: moment ().unix (),
    exp: moment ().add (3, 'hours').unix (),
  };
  return jwt.encode (payload, SECRET_KEY);
};

exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: moment ().add (30, 'days').unix (),
  };
  return jwt.encode (payload, SECRET_KEY);
};

exports.decodeToken = function (token) {
  return jwt.decode (token, SECRET_KEY, true);
};

exports.createconfirmationCode = function (email) {
  const payload = {
    email: email,
  };
  return jsonwebtoken.sign (payload, SECRET_KEY, {expiresIn: '3d'});
};
