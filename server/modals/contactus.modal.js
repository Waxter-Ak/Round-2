const { Schema, model } = require("mongoose");

const contactUs = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
        },
        email: {
            type: String,
            required: [true, "Please enter your e-mail"],
        },
        phone: {
            type: String,
        },
        subject: {
            type: String,
            required: [true, "Please enter your subject"],
        },
        message: {
            type: String,
            required: [true, "Please enter your message"],
        },
    },
    { timestamps: true },
);

module.exports = model("ContactUs", contactUs);