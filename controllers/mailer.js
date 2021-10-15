const nodemailer = require("nodemailer");
const gen_message = require("../templates/email_verification");
const ack_message = require("../templates/contact_ack.js");
//--------------------------------------------END OF IMPORTS--------------------------------------------------//
//-------------------------------------------CONFIG. TRANSPORTER-------------------------------------------//
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_NAME,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
//-----------------------------------------END CONFIG. TRANSPORTER-------------------------------------------//

//----------------------------------------------MAILER METHOD--------------------------------------------------//
exports.send_verification = async (user_email, username, domain, token) => {
  const message = gen_message.get_template(user_email, username, domain, token);
  try {
    const info = await transporter.sendMail(message);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
};
exports.send_ack = async (user_email, subject) => {
  const message = ack_message.get_template(user_email, subject);
  try {
    const info = await transporter.sendMail(message);
    console.log(info);
  } catch (err) {
    throw err;
  }
};
//--------------------------------------------END OF MAILER METHOD---------------------------------------------//
