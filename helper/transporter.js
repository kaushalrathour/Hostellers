const { createTransport } = require("nodemailer");

// For Production Purpose

// const transporter = createTransport({
//     host: "live.smtp.mailtrap.io",
//     port: 587,
//     auth: {
//       user: process.env.USER,
//       pass: process.env.PASS,
//     }
//   });

// For Testing Purpose
module.exports.transporter = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.T_USER,
    pass: process.env.T_PASS
  }
});
