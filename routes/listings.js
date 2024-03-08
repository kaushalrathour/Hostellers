const express = require("express");
const {
  validateListing,
  saveCurrentUrl,
  isLoggedIn,
  ensureListingOwner,
} = require("../middlewares");
const wrapAsync = require("../utilities/wrapAsync");
const router = new express.Router();
const listingsController = require("../controllers/listings.js");

router.route("/")
  .get(wrapAsync(listingsController.getListings))
  .post(isLoggedIn, validateListing, wrapAsync(listingsController.postListings));

router.get("/search", wrapAsync(listingsController.getListingsBySearch));

router.get("/for/:forWho", wrapAsync(listingsController.getListingsFor));

router.get("/new", isLoggedIn, (listingsController.getNewListingForm));

router.route("/:id")
  .get(wrapAsync(listingsController.getListingShowPage))
  .put(wrapAsync(listingsController.updateListing))
  .delete(isLoggedIn, ensureListingOwner, (listingsController.deleteListing));


router.get("/:id/edit", saveCurrentUrl, isLoggedIn, ensureListingOwner, wrapAsync(listingsController.getListingEditForm));

module.exports = router;
