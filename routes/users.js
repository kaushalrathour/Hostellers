const express = require("express");
const wrapAsync = require("../utilities/wrapAsync");
const User = require("../models/user");
const Listing = require("../models/listing");
const passport = require("passport");
const { isLoggedIn, saveCurrentUrl } = require("../middlewares");
const router = new express.Router();
const userController = require("../controllers/users");

router.route("/register")
.get(saveCurrentUrl, (userController.getRegisterForm))
.post(wrapAsync(userController.registerUser));

router.route("/login")
.get(saveCurrentUrl, (userController.getLoginForm))
.post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), 
    wrapAsync(userController.userLogin));

router.get("/logout", (userController.userLogout))

router.get("/account/edit", isLoggedIn,  wrapAsync(userController.getEditForm))

router.route("/:username")
.put(isLoggedIn, wrapAsync(userController.updateUser))
.get(wrapAsync(userController.getUserProfile));

module.exports = router;