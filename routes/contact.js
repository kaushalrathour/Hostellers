const express = require("express");
const wrapAsync = require("../utilities/wrapAsync");
const contactController = require("../controllers/contact.js");
const router = new express.Router();

router.post("/contact", wrapAsync(contactController.postContact))

module.exports = router;