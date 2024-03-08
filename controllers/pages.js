const Listing = require("../models/listing");

module.exports.getRootPage = async (req, res) => {
    let listings = await Listing.find({})
        .populate({
            path: "reviews",
            populate: {
                path: "by",
                model: "User"
            }
        })
        .populate("owner")
        .limit(6);
    res.render("home.ejs", { listings });
};

module.exports.getHomePage = (req, res) => {
    res.redirect("/");
};

module.exports.getAboutPage = (req, res) => {
    res.render("pages/about.ejs");
};

module.exports.getPrivacyPage = (req, res) => {
    res.render("pages/privacy.ejs");
};

module.exports.getTermsPage = (req, res) => {
    res.render("pages/terms.ejs");
};
