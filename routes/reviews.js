const express = require("express");
const { saveCurrentUrl, isLoggedIn } = require("../middlewares");
const wrapAsync = require("../utilities/wrapAsync");
const Review = require("../models/review");
const Listing = require("../models/listing");
const router = new express.Router();

router.post("/review", saveCurrentUrl, isLoggedIn, async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        res.redirect("/listings");
    }
    let review = new Review (req.body.review);
    review.by = req.user;
    listing.reviews.push(review);
    await listing.save();
    await review.save();
    res.redirect(`/listings/${id}`); 
});

router.delete("/review/:reviewId", saveCurrentUrl, isLoggedIn, wrapAsync(async(req, res)=>{
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;