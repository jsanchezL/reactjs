const nodemailer = require ('nodemailer'),
  log4js = require ('log4js'),
  logger = log4js.getLogger (),
  {USER_SMTP, PWD_SMTP, DOMAIN, LOG_LEVEL} = require ('../config.js');

logger.level = LOG_LEVEL;

const transport = nodemailer.createTransport ({
  service: 'Gmail',
  auth: {
    user: USER_SMTP,
    pass: PWD_SMTP,
  },
});

const templates = {
  confirmationSubscription: {
    subject: 'Please confirm your account',
    body: `<h1>Email Confirmation</h1>
        <h2>Hello</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href={DOMAIN}/confirm/{CONFIRMATION_CODE}> Click here</a>`,
  },
  confirmationSubscriptionByAdmin: {
    subject: 'Your account was create by admin',
    body: `<h1>Email Confirmation</h1>
        <h2>Hello {NAME} {LASTNAME}</h2>
        <p>Welcome to Warden, please login by clicking on the following link</p>
        <a href={DOMAIN}/autoSignIn/{CONFIRMATION_CODE}> Click here</a>`,
  },
};

module.exports.sendEmail = (idTemplate, data) => {
  const template = templates[idTemplate];
  let html = '';

  switch (idTemplate) {
    case 'confirmationSubscription':
      html = template.body
        .replace ('{DOMAIN}', DOMAIN)
        .replace ('{CONFIRMATION_CODE}', data.confirmationCode);
      break;
    case 'confirmationSubscriptionByAdmin':
      html = template.body
        .replace ('{DOMAIN}', DOMAIN)
        .replace ('{CONFIRMATION_CODE}', data.confirmationCode)
        .replace ('{NAME}', data.name)
        .replace ('{LASTNAME}', data.lastname);
      break;
  }

  transport
    .sendMail ({
      from: USER_SMTP,
      to: data.email,
      subject: template.subject,
      html: html,
    })
    .catch (err => logger.debug (err));
};
