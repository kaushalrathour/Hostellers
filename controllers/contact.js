const { contactMail } = require("../helper/sendMail.js");
const {getContactText} = require("../helper/htmlText.js");
const Contact = require("../models/contact.js");
module.exports.postContact = async(req, res)=> {
    let {name, email, message} = req.body.contact;
    let contact = new Contact({name, email, message});
    await contact.save();
    console.log(contact);
    await contactMail(name, getContactText(name, message, email));
    req.flash("success", "Our Team Will Contact You Soon")
    res.redirect("/");
}