const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const model = mongoose.model;

const contactSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    timestamp: {
        type: Date,
        default: Date.now,
      },
      message: {
        type: String,
        required: true,
    },
})

module.exports = model("Contact", contactSchema);