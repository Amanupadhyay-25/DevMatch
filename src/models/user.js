const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
        required: true, // Optional: Ensures age is always provided
        validate: {
            validator: function (value) {
                return value >= 18 && value <= 65;  // Ensuring age is between 18 and 65
            },
            message: "User age must be between 18 and 65",
        },
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},{
    timestamps : true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
