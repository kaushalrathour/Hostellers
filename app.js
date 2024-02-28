const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const ExpressError = require("./utilities/ExpressError.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const pagesRoute = require("./routes/pages.js");
const listingsRoute = require("./routes/listings.js");
const reviewsRoute = require("./routes/reviews.js");
const usersRoute = require("./routes/users.js");

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



app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user || false;
    console.log("Im req user", req.user || false);
    next();
})


app.use("/", pagesRoute);
app.use("/listings", listingsRoute);
app.use("/listings/:id/", reviewsRoute)
app.use("/", usersRoute)
 

main().then((res)=>{
    console.log("Database is ready!")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Hostellers');
}

app.use((err, req, res, next) =>{
    if(err.message.includes("Cast to ObjectId failed")) {
        req.flash("error", "Bad Request");
        res.redirect("/listings");
    }
    if(err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        req.flash("error", "Email is already in use!")
        res.redirect(req.headers.referer);
    }
    else if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
        req.flash("error", "Username is already in use");
        res.redirect(req.headers.referer);
    }
    else {
        next(err);
    }
})

app.all("*", (req, res)=> {
    throw new ExpressError(404, "Page Not Found");
})

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