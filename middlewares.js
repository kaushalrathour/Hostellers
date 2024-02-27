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
    redirectUrl = req.path.includes('/review')? req.headers.referer : redirectUrl = req._parsedOriginalUrl.pathname;
    console.log(redirectUrl)
    next();
}
module.exports.ensureAccountOwner = (req, res, next) => {
    if(req.user.username === req.params.username) {
        next();
    }else {
        throw new ExpressError(403, "Access Denied");
    }
}

module.exports.getRedirectUrl = () => {
    return redirectUrl;
}