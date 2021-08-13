const bcrypt = require ('bcrypt-nodejs'),
  User = require ('../models/user'),
  jwt = require ('../services/jwt'),
  mailer = require ('../services/mailer'),
  fs = require ('fs'),
  path = require ('path'),
  log4js = require ('log4js'),
  logger = log4js.getLogger (),
  {UPLOAD_DIR, LOG_LEVEL} = require ('../config');

logger.level = LOG_LEVEL;

/**
 * @description Register new users
 * @param {*} req Request, expect one payload with email, password, and confirmation password
 * @param {*} res Response 
 * @returns Status response
 * - 404 The passwords are Required! 
 * - 404 The passwords must are equals!
 * - 500 When some error result into process encrypt
 * - 500 Exists other user with same email
 * - 404 Error when created user because don't retrieve from db
 * - 200 Send user stored 
 */
function signUp (req, res) {
  const user = new User ();
  const {email, password, repeatPassword} = req.body;
  user.email = email.toLowerCase ();

  if (!password || !repeatPassword) {
    res.status (404).send ({message: 'The passwords are Required!'});
  } else {
    if (password !== repeatPassword) {
      res.status (404).send ({message: 'The passwords must are equals!'});
    } else {
      bcrypt.hash (password, null, null, function (err, hash) {
        if (err) {
          res.status (500).send ({message: 'Server internal error'});
          logger.debug (err);
        } else {
          user.password = hash;
          user.confirmationCode = jwt.createConfirmationCode (email);
          user.save ((err, userStored) => {
            if (err) {
              res
                .status (500)
                .send ({message: 'Exists other user with same email'});
              logger.debug (err);
            } else {
              if (!userStored) {
                res.status (404).send ({message: 'Error when created user'});
              } else {
                res.status (200).send ({
                  user: userStored,
                  isUpdate: false,
                  message: 'User was registered successfully! Please check your email',
                });
                mailer.sendEmail ('confirmationSubscription', userStored);
              }
            }
          });
        }
      });
    }
  }
}

function signIn (req, res) {
  const {email, password} = req.body;
  User.findOne ({email}, (err, userStored) => {
    if (err) {
      res.status (500).send ({message: 'Server internal error'});
      logger.debug (err);
    } else {
      if (!userStored) {
        res.status (404).send ({message: 'User not found'});
      } else {
        bcrypt.compare (password, userStored.password, (err, isValid) => {
          if (err) {
            res.status (500).send ({message: 'Server internal error'});
            logger.debug (err);
          } else if (!isValid) {
            res.status (404).send ({message: 'The password not match'});
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
        });
      }
    }
  });
}

function getUsers (req, res) {
  User.find ().then (users => {
    if (!users) {
      res.status (404).send ({message: 'We not found users in system'});
    } else {
      res.status (200).send ({users});
    }
  });
}

function getUsersByStatus (req, res) {
  const values = req.body.values;
  User.find ({status: {$in: values}}).then (users => {
    if (!users) {
      res.status (404).send ({message: 'We not found users in system'});
    } else {
      res.status (200).send ({users});
    }
  });
}

function uploadAvatar (req, res) {
  const {id} = req.params;
  User.findById ({_id: id}, (err, userStored) => {
    if (err) {
      res.status (500).send ({message: 'Server internal error'});
      logger.debug (err);
    } else {
      if (!userStored) {
        res.status (404).send ({message: 'User not found'});
      } else {
        let user = userStored;
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
            user.avatar = fileName;
            User.findByIdAndUpdate ({_id: id}, user, (err, userResult) => {
              if (err) {
                res.status (500).send ({message: 'Server internal error'});
                logger.debug (err);
              } else {
                if (!userResult) {
                  res.status (404).send ({message: 'User not found'});
                } else {
                  res.status (200).send ({avatar: fileName});
                }
              }
            });
          }
        }
      }
    }
  });
}

function getAvatar (req, res) {
  const {avatarName} = req.params;
  const filePath = `${UPLOAD_DIR}/avatar/${avatarName}`;
  fs.stat (filePath, (err, stat) => {
    if (err === null) {
      res.sendFile (path.resolve (filePath));
    } else if (err.code === 'ENOENT') {
      res.status (404).send ({message: 'Image not found'});
    } else {
      logger.debug ('Some other error: ', err.code);
      res.status (500).send ({message: 'Server internal error'});
      logger.debug (err);
    }
  });
}

function updateUser (req, res) {
  const {id} = req.params;
  let userData = req.body;
  if (userData.email) {
    userData.email = req.body.email.toLowerCase ();
  }
  User.findByIdAndUpdate ({_id: id}, userData, (err, userStored) => {
    if (err) {
      res.status (500).send ({message: 'Server internal error'});
      logger.debug (err);
    } else {
      if (!userStored) {
        res.status (404).send ({message: 'User not found'});
      } else {
        User.findById ({_id: userStored._id}, (err, userUpdate) => {
          if (err) {
            res.status (500).send ({message: 'Server internal error'});
            logger.debug (err);
          } else {
            res.status (200).send ({user: userUpdate, isUpdate: true});
          }
        });
      }
    }
  });
}

function deleteUser (req, res) {
  const {id} = req.params;
  User.findByIdAndDelete (id, (err, user) => {
    if (err) {
      res.status (500).send ({message: 'Server internal error'});
      logger.debug (err);
    } else {
      if (!user) {
        res.status (404).send ({message: 'User not found'});
      } else {
        res.status (200).send ({delete: true, message: 'Deleted successful'});
      }
    }
  });
}

function createUser (req, res) {
  const user = new User ();
  const {name, lastname, email, password, isAdmin, status} = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase ();
  user.isAdmin = isAdmin;
  user.status = status;
  bcrypt.hash (password, null, null, function (err, hash) {
    if (err) {
      res.status (500).send ({message: 'Server internal error'});
      logger.debug (err);
    } else {
      user.password = hash;
      user.confirmationCode = jwt.createConfirmationCode (email);
      user.save ((err, userStored) => {
        if (err) {
          res
            .status (500)
            .send ({message: 'Exists other user with same email'});
          logger.debug (err);
        } else {
          if (!userStored) {
            res.status (404).send ({message: 'Error when created user'});
          } else {
            res.status (200).send ({
              user: userStored,
              isUpdate: false,
              message: 'User was registered successfully!',
            });
            // TODO: sendEmail to auth login
            mailer.sendEmail ('confirmationSubscriptionByAdmin', userStored);
          }
        }
      });
    }
  });
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersByStatus,
  uploadAvatar,
  getAvatar,
  updateUser,
  deleteUser,
  createUser,
};
