const express = require("express");
const { validateListing, saveCurrentUrl, isLoggedIn, ensureListingOwner } = require("../middlewares");
const wrapAsync = require("../utilities/wrapAsync");
const router = new express.Router();
const listingsController = require("../controllers/listings.js");
const Listing = require("../models/listing");

router.get("/", wrapAsync(listingsController.getListings));

router.get("/for/:forWho", wrapAsync(listingsController.getListingsFor));

router.get("/search", wrapAsync(listingsController.getListingsBySearch));

router.post("/",   isLoggedIn, validateListing, wrapAsync(listingsController.postListings));

router.get("/new", isLoggedIn, (listingsController.getNewListingForm))

router.get("/:id",  wrapAsync(listingsController.getListingShowPage));

router.get("/:id/edit",  saveCurrentUrl, isLoggedIn, ensureListingOwner, wrapAsync(listingsController.getListingEditForm));



router.delete("/:id", isLoggedIn, ensureListingOwner,(listingsController.deleteListing))

router.put("/:id",  wrapAsync(listingsController.updateListing))

module.exports = router;