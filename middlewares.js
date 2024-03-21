const ExpressError = require("./utilities/ExpressError.js");
const { listingSchema } = require("./schema.js");
const Listing = require("./models/listing.js");
const wrapAsync = require("./utilities/wrapAsync.js");
const Review = require("./models/review.js");

// Variable to store the redirect URL
let redirectUrl;

// Function to get the current redirect URL
module.exports.getRedirectUrl = () => {
    return redirectUrl;
}

// Middleware to validate the listing schema
module.exports.validateListing = (req, res, next) => {
    console.log("Validating Listing");
    const { error } = listingSchema.validate(req.body);
    if (error) {
        console.log("Listing Error Triggered");
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must login");
        return res.redirect("/login");
    }
    next();
}

// Middleware to save the current URL for redirection
module.exports.saveCurrentUrl = (req, res, next) => {
    if (req.path.includes('/review')) {
        redirectUrl = req.headers.referer;
        next();
    } else if (req.path == "/login" || req.path == "/register") {
        if (!req.headers.referer) next();
        else if (req.headers.referer.includes("login") || req.headers.referer.includes("register")) {
            next();
        } else {
            redirectUrl = req.headers.referer;
            next();
        }
    } else {
        redirectUrl = req.path;
        next();
    }
}

// Middleware to ensure the user is the owner of the listing
module.exports.ensureListingOwner = wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("owner");
    if (!listing) {
        req.flash("error", "Listing Not Found In Ensuring Owner");
        res.redirect(`/${req.user.username}`);
    } else if (listing.owner.username === req.user.username) {
        next();
    } else {
        req.flash("error", "Access Denied");
        res.redirect(`/${req.user.username}`);
    }
});

// Middleware to ensure the user is the reviewer
module.exports.ensureReviewer = wrapAsync(async (req, res, next) => {
    let { reviewId } = req.params;
    let review = await Review.findById(reviewId).populate("by")
    if (!review) {
        req.flash("error", "Review Does Not Exist");
        res.redirect(redirectUrl || "back");
    } else if (req.user.username === review.by.username) {
        next();
    } else {
        req.flash("error", "Access Denied");
        res.redirect(redirectUrl || "back");
    }
});
