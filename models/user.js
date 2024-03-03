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
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    username: {
        type: String,
        trim: true, 
        unique: true,
        lowercase: true,
        maxLength: 16,
        validate: {
            validator: function(value) {
                const regex = /^[a-zA-Z0-9_]+$/;
                return regex.test(value);
            },
            message: props => `${props.value} is not a valid username. Only letters, numbers, and underscores are allowed.`,
        },
    },
    accountType: {
        type: String,
        enum: ["Personal", "Business"],
        default: "Personal",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


userSchema.plugin(passportLocalMongooese);

module.exports = model("User", userSchema);