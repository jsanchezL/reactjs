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
        <a href={DOMAIN}/confirm/{confirmationCode}> Click here</a>`,
  },
};

module.exports.sendEmail = (idTemplate, data) => {
  const {confirmationCode, email} = data;
  const template = templates[idTemplate];
  //   let html = template.body.replace('{DOMAIN}',DOMAIN).replace('{confirmationCode}',confirmationCode);
  transport
    .sendMail ({
      from: USER_SMTP,
      to: email,
      subject: template.subject,
      html: template.body
        .replace ('{DOMAIN}', DOMAIN)
        .replace ('{confirmationCode}', confirmationCode),
    })
    .catch (err => logger.debug (err));
};
