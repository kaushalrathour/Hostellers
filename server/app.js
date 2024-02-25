const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const Review = require("./models/review.js");
const ExpressError = require("./utilities/ExpressError.js");
const wrapAsync = require("./utilities/wrapAsync.js");
const { listingSchema } = require("./schema.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const listing = require("./models/listing.js");
let sessionOptions = {
    // store: store,
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 + 60 * 60 * 1000,
        maxAge: 7 * 24 + 60 * 60 * 1000,
        httpOnly: true,
    },
    
}
app.use(session(sessionOptions))
app.use(flash());
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("ejs", {__dirname: "views"});
app.engine("ejs", engine);
app.use(express.static('public'));



// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const validateListing = (req, res, next) => {
    console.log("Validating Listing");
    const { error } = listingSchema.validate(req.body);
    if (error) {
        console.log("Listing Error Triggered");
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user || false;
    console.log("Im req user", req.user || false);
    next();
})

let isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    }
    else {
        req.flash("error", "You must login");
        res.redirect("/login");
    }
}
let ensureAccountOwner = (req, res, next) => {
    if(req.user.username === req.params.username) {
        next();
    }else {
        throw new ExpressError(403, "Access Denied");
    }
}

app.get("/", (req, res)=> {
    res.render("home.ejs");
})

app.get("/home", (req,res) =>{
    res.redirect("/");
})

app.get("/listings", wrapAsync(async(req, res)=>{
    let listings = await Listing.find({});
    res.render("listings/index.ejs", {listings});
    // res.send(listings);
}))

app.post("/listings",   isLoggedIn, validateListing, wrapAsync(async (req, res)=>{
    let listing = req.body.listing;
    
    // res.send(listing);
    // console.log(listing);
    let newListing = new Listing(listing);
    newListing.owner = req.user;
    await newListing.save();
    req.flash("success", "Listing Added Successfully");
    res.redirect("/listings");
}));

app.get("/listings/new", isLoggedIn, (req, res)=> {
    res.render("listings/new.ejs")
})

app.get("/listings/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "by",
            model: "User" 
        }
    }).populate("owner");
    if(!listing) {
        req.flash("error", "Listing Not Found");
        res.redirect("/listings");
    }
    else {
        // console.log(listing);
        res.render("listings/show.ejs", {listing});}
    
    
    // res.send(listing);
}));

app.get("/listings/:id/edit", isLoggedIn, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
    // res.send(listing);
}));



app.delete("/listings/:id", isLoggedIn, async (req, res)=>{
    let {id} = req.params;
    console.log(id);
    // let listing = req.body.listing;
    listing = await Listing.findByIdAndDelete(id).catch((err)=>{
        console.log(err);
    })
    // // await newListing.save();
    res.redirect("/listings");
})

app.put("/listings/:id", validateListing, wrapAsync(async (req, res)=>{
    let {id} = req.params;
    
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing).catch((err)=>{
        console.log(err);
    })
    // listing.owner = req.user;
    // await listing.save();
    res.redirect(`/listings/${id}`);
}))

// Review
app.post("/listings/:id/review", isLoggedIn, async(req, res)=>{
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

app.delete("/listings/:id/review/:reviewId", async(req, res)=>{
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    // req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
});

app.get("/register", (req, res)=> {
    res.render("user/register.ejs");
})

app.post("/register", wrapAsync(async (req, res)=>{
    let {password} = req.body
    let user = req.body.user;
    user.username = user.username.replace(/\s/g, '');
    let newUser = await User.register(req.body.user, password);
    req.flash("success", `Welcome to Hostellers ,${newUser.name}`);
    console.log(newUser);
    res.redirect("/listings");
}))

app.get("/login", (req, res) => {
    res.render("user/login.ejs");
})

app.post("/login", passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), 
    async (req, res)=> {
    console.log(req.user);
    req.flash("success", "Happy to see you again");
    res.redirect('/listings');
  });

app.get("/account/edit", isLoggedIn,  async (req, res)=> {
    res.render("user/edit.ejs");
})

// app.put("/:username", isLoggedIn, passport.authenticate("local",
//  {failureRedirect: "/:username", failureFlash: true}),
// async (req, res)=> {
//     let {username, newPassword, accountType, email, } = req.body;
// })
app.get("/:username", async (req, res)=> {
    let user = await User.findOne({username: req.params.username});
    if(user) {
        // res.send(user);
        res.render("user/show.ejs", {user});
    }else {
        req.flash("error", "No user found");
        res.redirect("/register");
    }
}) 


// React testing 


app.get("/react", (req, res)=> {
    console.log("triggerred");
    res.json({"name": "kaushal"})
})

main().then((res)=>{
    console.log("Database is ready!")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Hostellers');
}



// Error Handling Middleware 
app.use((err, req, res, next) =>{
    const {status = 500, message = "Some Error Occured"} = err;
    console.log("I'm Triggerred");
    res.status(status).render("error.ejs", {status, message});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server is running on PORT", PORT);
})