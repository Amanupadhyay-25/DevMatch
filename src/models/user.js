const mongoose = require("mongoose");
 const validator=require("validator");

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
            message: "Sahi age daalo",
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: "Invalid Email"
        }
    },
    
    password: {
        type: String,
        required: true
    },
    skill : {
        type : String
    }
},{
    timestamps : true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
