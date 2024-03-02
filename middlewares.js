const ExpressError = require("./utilities/ExpressError.js");
const { listingSchema } = require("./schema.js");
const Listing = require("./models/listing.js");
const wrapAsync = require("./utilities/wrapAsync.js");
let redirectUrl;

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

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "You must login");
        return res.redirect("/login");
        
    }
    next();
}

module.exports.saveCurrentUrl = (req, res, next) => {
    if(req.path == "/login" || req.path == "/register" || req.path == "/logout"|| req.path.includes('/review')) {
        redirectUrl = req.headers.referer;
        console.log("If Trigerred", redirectUrl);
        next();
    } else {
        redirectUrl = req.path;
        console.log("Else Trigerred", redirectUrl);
        next();
    }
    
}
module.exports.ensureListingOwner = wrapAsync(async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("owner");
    if(!listing) {
        req.flash("error", "Listing Not Found In Ensuring Owner");
        res.redirect(`/${req.user.username}`);
    }
     else if  (listing.owner.username === req.user.username) {
        console.log("Access Given");
        next();
    }
     else {
        console.log("Access Denied");
        req.flash("error", "Access Denied");
        res.redirect(`/${req.user.username}`);
    }
    
})

module.exports.getRedirectUrl = () => {
    return redirectUrl;
}

