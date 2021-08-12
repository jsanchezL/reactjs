const jwt = require ('../services/jwt');
const moment = require ('moment');
const User = require ('../models/user');

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
        console.log (err);
      } else {
        if (!userStored) {
          res.status (404).send ({message: 'User not found'});
        } else {
          const user = userStored;
          user.status = 'Active';
          user.save ((err, userUpdate) => {
            if (err) {
              res.status (500).send ({message: 'Server internal error'});
              console.log (err);
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

module.exports = {
  refreshAccessToken,
  verifyUser,
};
