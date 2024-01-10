const { Schema, model } = require("mongoose");
const validator = require("validator");
const { compare, genSalt, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
        },
        email: {
            type: String,
            required: [true, "Please enter your e-mail"],
            unique: true,
            validate: [validator.isEmail, "Please Enter a valid Email"],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minLength: [8, "Password should be greater than 8 characters"],
            select: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    { timestamps: true },
);

// hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});

// compare hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

// Creating JWT tokens
userSchema.methods.getJWTToken = function () {
    return sign({ id: this._id }, String(process.env.JWT_SECRET), { expiresIn: process.env.JWT_EXPIRE });
};

module.exports = model("User", userSchema);