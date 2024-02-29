const Listing = require("../models/listing");


module.exports.getListings = async(req, res)=>{
    let listings = await Listing.find({}).populate({
        path: "reviews",
        populate: {
            path: "by",
            model: "User" 
        }
    }).populate("owner");
    res.render("listings/index.ejs", {listings});
};

module.exports.getListingsBySearch = async(req, res)=> {
    let {q} = req.query;
    if(q) {
    let listings = await Listing.find({}).populate("owner");
    req.flash("success", `Listings On the basic of ${q}`)
    res.render("listings/index.ejs", {listings});
    }
    else {
        res.send("Bad Request");
    }
    
}

module.exports.postListings = async (req, res)=>{
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    newListing.owner = req.user;
    await newListing.save();
    req.flash("success", "Listing Added Successfully");
    res.redirect("/listings");
};

module.exports.getListingEditForm = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    listing?(
        res.render("listings/edit.ejs", {listing})
    ):(req.flash("error", "Listing Not Found"),
     res.redirect("/listings"));
    
}

module.exports.getNewListingForm = (req, res)=> {
    res.render("listings/new.ejs")
};

module.exports.getListingShowPage = async(req, res)=>{
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
        res.render("listings/show.ejs", {listing});
    };
};

module.exports.deleteListing = async (req, res)=>{
    let {id} = req.params;
    console.log(id);
    listing = await Listing.findByIdAndDelete(id).catch((err)=>{
        console.log(err);
    })
    res.redirect("/listings");
}

module.exports.updateListing = async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true, new: true}).catch((err)=>{
        console.log(err);
    })
    console.log(`Updated Listing ${listing}`);
    res.redirect(`/listings/${id}`);
}