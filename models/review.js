const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

let reviewSchema = new Schema ({
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    by: {
        type: Schema.Types.ObjectId,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = model("Review", reviewSchema);