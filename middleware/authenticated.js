const jwt = require ('jwt-simple'),
  moment = require ('moment'),
  log4js = require ('log4js'),
  logger = log4js.getLogger (),
  {SECRET_KEY, LOG_LEVEL} = require ('../config');

logger.level = LOG_LEVEL;

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
    logger.debug (ex);
    return res.status (404).send ({message: 'Token invalid'});
  }
  req.user = payload;
  next ();
};
