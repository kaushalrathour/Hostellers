const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");
const engine = require("ejs-mate");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("ejs", {__dirname: "views"});
app.engine("ejs", engine);
app.use(express.static('public'))

app.get("/", (req, res)=> {
    res.redirect("/home");
})

app.get("/home", (req,res) =>{
    res.render("home.ejs");
})

app.get("/listings", async(req, res)=>{
    let listings = await Listing.find({});
    res.render("listings/index.ejs", {listings});
    // res.send(listings);
})

app.get("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
    // res.send(listing);
})
app.get("/listings/new", (req, res)=> {
    res.render("listings/new.ejs")
})

app.post("/listings", async (req, res)=>{
    let listing = req.body.listing;
    let newListing = new Listing(listing);
    await newListing.save();
    res.send({listing});
})

main().then((res)=>{
    console.log("Database is ready!")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Hostellers');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server is running on PORT", PORT);
})