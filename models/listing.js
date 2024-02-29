const mongoose = require("mongoose");
const Review = require("./review");
const Schema =  mongoose.Schema;
const model = mongoose.model;

const listingSchema = new Schema ({
    title: String,
    forWho: {
        type: String,
        enum: ["Boys", "Girls", "Both"]
    },
    city: {
        type: String,
        uppercase: true,
    },
    state: {
        type: String,
        uppercase: true,
    },
    address: {
        type: String,
        uppercase: true,
    },
    price: Number,
    image: String,
    description: String,
    bedrooms: Number,
    nearCollege: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    roomType: {
        type: String,
        enum: ["Single", "Double", "Triple", "Dormitory"]
    },
    facilities: {
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }]
})

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
        console.log("Post Trigerred");
    }
    
})
module.exports = model("Listing", listingSchema);