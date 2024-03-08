const express = require("express");
const { saveCurrentUrl, isLoggedIn, ensureReviewer } = require("../middlewares");
const wrapAsync = require("../utilities/wrapAsync");
const reviewController = require("../controllers/reviews.js");
const router = new express.Router();

router.post("/:id/review", saveCurrentUrl, isLoggedIn, wrapAsync(reviewController.postReview));

router.delete("/:id/review/:reviewId", saveCurrentUrl, isLoggedIn, ensureReviewer, wrapAsync(reviewController.deleteReview));

module.exports = router;