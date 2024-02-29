const { getRedirectUrl} = require("../middlewares");
const { removeSpaces } = require("../helper.js");
const Listing = require("../models/listing");
const User = require("../models/user");

module.exports.getRegisterForm = (req, res)=> {
    res.render("user/register.ejs");
}

module.exports.registerUser = async (req, res, next)=>{
    let {name, username, email, password, accountType} = req.body;
    username = removeSpaces(username);
    let user = new User ({username, email})
        let newUser = await User.register(user, password);
        req.login(newUser, (err)=>{
            if(err){
                req.flash("error", err.message)
                return next(err);
            }
        })
        user.name = name;
        user.accountType = accountType;
        await user.save(); 
        req.flash("success", `Welcome to Hostellers ,${name}`);
        res.redirect("/listings");
    
}

module.exports.getLoginForm = (req, res) => {
    res.render("user/login.ejs");
}

module.exports.userLogin = async (req, res)=> {
    req.flash("success", "Happy To See You Again");
    res.redirect(getRedirectUrl() || "/listings");
};

module.exports.userLogout = (req, res, next)=> {
    req.isAuthenticated()
        ? req.logout((err) => (err ? next(err) :
         (req.flash("success", "Logged Out Successfully"),
            res.redirect("/listings"))))
        : (req.flash("error", "Hmm! Nice Try"),
             res.redirect("/listings"));
}

module.exports.getEditForm = async (req, res)=> {
    res.render("user/edit.ejs");
}

module.exports.updateUser = async (req, res)=> {
    let user = req.params.username;
    let {username, email, name, accountType } = req.body.user;
    username = removeSpaces(username);
    let updatedUser = await User.findOneAndUpdate({username: user},
         {$set: {username, email, name, accountType}}
         ,{new: true} );
    if(!updatedUser) {
        req.flash("error", "Forbidden");
        res.redirect("/login");
    }
    else{
        req.flash("success", "Details updated successfully");
        res.redirect(`/${updatedUser.username}`);
    }
    
}

module.exports.getUserProfile = async (req, res)=> {
    let user = await User.findOne({username: req.params.username});
    if(user) {
        let listings = await Listing.find({owner: user._id}) || [];
        res.render("user/show.ejs", {user, listings});
        
    }else {
        req.flash("error", "No user found");
        res.redirect("/register");
    }
}