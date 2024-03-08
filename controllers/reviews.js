const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.postReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        console.log(id);
        req.flash("error", "No Listing Found");
        res.redirect("/listings");
    }

    let review = new Review(req.body.review);
    console.log(review);
    review.by = req.user;
    listing.reviews.push(review);
    await listing.save();
    await review.save();
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};
