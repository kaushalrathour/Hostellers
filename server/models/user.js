const mongoose = require("mongoose");
const passportLocalMongooese = require("passport-local-mongoose");
const Schema =  mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        trim: true, 
        unique: true,
        lowercase: true,
    },
    accountType: {
        type: String,
        enum: ["Personal", "Bussiness"],
        default: "Personal",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


userSchema.plugin(passportLocalMongooese);

module.exports = model("User", userSchema);