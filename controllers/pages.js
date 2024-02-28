module.exports.getRootPage = (req, res)=> {
    res.render("home.ejs");
}

module.exports.getHomePage = (req,res) =>{
    res.redirect("/");
}

module.exports.getAboutPage = (req, res) => {
    res.render("pages/about.ejs");
}

module.exports.getPrivacyPage = (req, res) => {
    res.render("pages/privacy.ejs");
}

module.exports.getTermsPage = (req, res) => {
    res.render("pages/terms.ejs");
}