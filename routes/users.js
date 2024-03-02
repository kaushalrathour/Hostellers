const express = require("express");
const wrapAsync = require("../utilities/wrapAsync");
const User = require("../models/user");
const Listing = require("../models/listing");
const passport = require("passport");
const { isLoggedIn, saveCurrentUrl } = require("../middlewares");
const router = new express.Router();
const userController = require("../controllers/users");

router.get("/register", saveCurrentUrl, (userController.getRegisterForm))

router.post("/register", wrapAsync(userController.registerUser));

router.get("/login", saveCurrentUrl, (userController.getLoginForm))

router.post("/login", passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), 
    wrapAsync(userController.userLogin));

router.get("/logout", saveCurrentUrl, (userController.userLogout))

router.get("/account/edit", isLoggedIn,  wrapAsync(userController.getEditForm))

router.put("/:username", isLoggedIn, wrapAsync(userController.updateUser));

router.get("/:username", wrapAsync(userController.getUserProfile)) 

module.exports = router;