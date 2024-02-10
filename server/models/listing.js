const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const model = mongoose.model;

const listingSchema = new Schema ({
    title: String,
    forWho: {
        type: String,
        enum: ["Boys", "Girls", "Both"]
    },
    city: String,
    state: String,
    address: String,
    price: Number,
    image: String,
    description: String,
    roomType: {
        type: String,
        enum: ["Single", "Double", "Triple", "Dormitory"]
    },
    facilities: [{
        type: String,
        enum: ["WiFi", "Parking", "Gym", "Laundry", "Air Conditioning", "Heating", "Kitchen", "TV", "Mess", "Washroom"]
    }],
})

module.exports = model("Listing", listingSchema);