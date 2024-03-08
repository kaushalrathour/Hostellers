const { transporter } = require("./transporter.js");

module.exports.welcomeMail = async (email, htmlText) => {
  const info = await transporter.sendMail({
    from: '"Hostellers" <mailtrap@q-startechnologies.com>',
    to: email,
    subject: "Thanks For Choosing Hostellers",
    html: htmlText
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports.contactMail = async (name, htmlText) => {
  const info = await transporter.sendMail({
    from: '"Hostellers" <mailtrap@q-startechnologies.com>',
    to: "mailtrap@q-startechnologies.com",
    subject: `Message From ${name}`,
    html: htmlText
  });

  console.log("Message sent: %s", info.messageId);
};
