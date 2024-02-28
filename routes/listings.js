const express = require("express");
const { validateListing, saveCurrentUrl, isLoggedIn } = require("../middlewares");
const wrapAsync = require("../utilities/wrapAsync");
const Listing = require("../models/listing.js");
const router = new express.Router();

router.get("/", wrapAsync(async(req, res)=>{
    let listings = await Listing.find({}).populate("owner");
    res.render("listings/index.ejs", {listings});
}))

router.post("/",   isLoggedIn, validateListing, wrapAsync(async (req, res)=>{
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    newListing.owner = req.user;
    await newListing.save();
    req.flash("success", "Listing Added Successfully");
    res.redirect("/listings");
}));

router.get("/new", isLoggedIn, (req, res)=> {
    res.render("listings/new.ejs")
})

router.get("/:id",  wrapAsync(async(req, res)=>{
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
        console.log(listing);
        res.render("listings/show.ejs", {listing});}
}));

router.get("/:id/edit",  saveCurrentUrl, isLoggedIn, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    listing?(
        res.render("listings/edit.ejs", {listing})
    ):(req.flash("error", "Listing Not Found"),
     res.redirect("/listings"));
    
}));



router.delete("/:id", isLoggedIn, async (req, res)=>{
    let {id} = req.params;
    console.log(id);
    listing = await Listing.findByIdAndDelete(id).catch((err)=>{
        console.log(err);
    })
    res.redirect("/listings");
})

router.put("/:id", validateListing, wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing).catch((err)=>{
        console.log(err);
    })
    res.redirect(`/listings/${id}`);
}))

module.exports = router;