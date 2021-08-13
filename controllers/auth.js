const jwt = require ('../services/jwt'),
  moment = require ('moment'),
  log4js = require ('log4js'),
  logger = log4js.getLogger (),
  User = require ('../models/user'),
  {LOG_LEVEL} = require ('../config');

logger.level = LOG_LEVEL;

function willExpireToken (token) {
  const {exp} = jwt.decodeToken (token);
  const currentDate = moment ().unix ();

  if (currentDate > exp) {
    return true;
  }
  return false;
}

function refreshAccessToken (req, res) {
  const {refreshToken} = req.body;
  const isTokenExpired = willExpireToken (refreshToken);
  if (isTokenExpired) {
    res.status (404).send ({message: 'The token expired'});
  } else {
    const {id} = jwt.decodeToken (refreshToken);
    User.findOne ({_id: id}, (err, userStored) => {
      if (err) {
        res.status (500).send ({message: 'Server internal error'});
        logger.debug (err);
      } else {
        if (!userStored) {
          res.status (404).send ({message: 'User not found'});
        } else {
          res.status (200).send ({
            tokens: {
              accessToken: jwt.createAccessToken (userStored),
              refreshToken: refreshToken,
            },
          });
        }
      }
    });
  }
}

function verifyUser (req, res) {
  User.findOne (
    {confirmationCode: req.params.confirmationCode},
    (err, userStored) => {
      if (err) {
        res.status (500).send ({message: 'Server internal error'});
        logger.debug (err);
      } else {
        if (!userStored) {
          res.status (404).send ({message: 'User not found'});
        } else {
          const user = userStored;
          user.status = 'Active';
          user.save ((err, userUpdate) => {
            if (err) {
              res.status (500).send ({message: 'Server internal error'});
              logger.debug (err);
            } else {
              if (!userStored) {
                res.status (404).send ({message: 'Error when activate user'});
              } else {
                res.status (200).send ({user: userUpdate, isUpdate: true});
              }
            }
          });
        }
      }
    }
  );
}

function autoSignIn (req, res) {
  User.findOne (
    {confirmationCode: req.params.confirmationCode},
    (err, userStored) => {
      if (err) {
        res.status (500).send ({message: 'Server internal error'});
        logger.debug (err);
      } else {
        if (!userStored) {
          res.status (404).send ({message: 'User not found'});
        } else {
          if (
            userStored.status === 'Pending' ||
            userStored.status === 'Inactive'
          ) {
            let msg = userStored.status === 'Pending'
              ? 'Your user is pending, please finish the process for activation, check your email inbox, before reintent'
              : 'Your user is inactive, please contact to admin, before reintent';
            res.status (200).send ({
              code: 200,
              message: msg,
            });
          } else {
            res.status (200).send ({
              tokens: {
                accessToken: jwt.createAccessToken (userStored),
                refreshToken: jwt.createRefreshToken (userStored),
              },
            });
          }
        }
      }
    }
  );
}

module.exports = {
  refreshAccessToken,
  verifyUser,
  autoSignIn,
};
