const Listing = require("../models/listing");

module.exports.getListings = async (req, res) => {
    let listings = await Listing.find({})
        .populate({
            path: "reviews",
            populate: {
                path: "by",
                model: "User"
            }
        })
        .populate("owner");
    res.render("listings/index.ejs", { listings });
};

module.exports.getListingsFor = async (req, res) => {
    let { forWho } = req.params;
    if (forWho.toLowerCase() != "boys" && forWho.toLowerCase() != "girls") {
        console.log(forWho);
        req.flash("error", `Listings are not available for ${forWho}`);
        res.redirect("/listings");
    } else {
        let query = { forWho: { $regex: forWho, $options: "i" } };
        let listings = await Listing.find(query)
            .populate({
                path: "reviews",
                populate: {
                    path: "by",
                    model: "User"
                }
            })
            .populate("owner");
        req.flash("success", `Hostels For ${forWho} Only`);
        res.render("listings/index.ejs", { listings });
    }
};

module.exports.getListingsBySearch = async (req, res) => {
    let { q } = req.query;
    if (q) {
        const query = {
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { city: { $regex: q, $options: 'i' } },
                { state: { $regex: q, $options: 'i' } },
                { nearCollege: { $regex: q, $options: 'i' } },
            ],
        };

        let listings = await Listing.find(query)
            .populate({
                path: "reviews",
                populate: {
                    path: "by",
                    model: "User"
                }
            })
            .populate("owner");
        console.log(listings);
        if (!listings.length) {
            req.flash("error", `No Listings found based on the search term: ${q}`);
            res.redirect("/listings");
        } else {
            console.log(listings);
            req.flash("success", `Listings based on the search term: ${q}`);
            res.render("listings/index.ejs", { listings });
        }
    } else {
        req.flash("error", "Bad Request: Missing search query");
        res.redirect("back");
    }
};

module.exports.postListings = async (req, res) => {
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    newListing.owner = req.user;
    await newListing.save();
    req.flash("success", "Listing Added Successfully");
    res.redirect("/listings");
};

module.exports.getListingEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    listing ? (
        res.render("listings/edit.ejs", { listing })
    ) : (
        req.flash("error", "Listing Not Found"),
        res.redirect("/listings")
    );
};

module.exports.getNewListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.getListingShowPage = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "by",
                model: "User"
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing Not Found");
        res.redirect("/listings");
    } else {
        listing.views += 1;
        await listing.save();
        res.render("listings/show.ejs", { listing });
    }
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    listing = await Listing.findByIdAndDelete(id).catch((err) => {
        console.log(err);
    });
    res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true, new: true }).catch((err) => {
        console.log(err);
    });
    console.log(`Updated Listing ${listing}`);
    res.redirect(`/listings/${id}`);
};
