const mongoose = require("mongoose");
const Review = require("./review");
const Schema =  mongoose.Schema;
const model = mongoose.model;

const listingSchema = new Schema ({
    title: String,
    forWho: {
        type: String,
        enum: ["Boys", "Girls"]
    },
    city: String,
    state: String,
    address: String,
    price: Number,
    image: { path: String,
        filename: {
            type: String,
            default: "DefaultFileName"
        },
    },
    description: String,
    bedrooms: Number,
    nearCollege: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    roomType: {
        // type: String,
        // enum: ["Single", "Double", "Triple", "Dormitory"]
    },
    facilities: {
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    views: {
        type:Number,
        default: 0,
    }
})

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
        console.log("Post Trigerred");
    }
    
})
module.exports = model("Listing", listingSchema);