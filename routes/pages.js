const express = require("express");
const pageController = require("../controllers/pages");
const router = new express.Router();

router.get("/", pageController.getRootPage);

router.get("/home", pageController.getHomePage);

router.get("/about", pageController.getAboutPage);

router.get("/privacy", pageController.getPrivacyPage);

router.get("/terms", pageController.getTermsPage);

module.exports = router;
