const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const model = mongoose.model;

const listingSchema = new Schema ({
    title: String,
    forWho: {
        type: String,
        enum: ["boys", "girls", "boys"]
    },
    city: String,
    state: String,
    address: String,
    price: Number,
    image: String,
    description: String,
    roomType: {
        type: String,
        enum: ["single", "double", "triple", "dormitory"]
    },
})

module.exports = model("Listing", listingSchema);