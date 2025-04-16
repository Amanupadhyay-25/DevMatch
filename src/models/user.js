const mongoose = require("mongoose");
 const validator=require("validator");
 const Jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        unique:true,
    },
    lastName:{
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        lowercase:true,
        unique:true,
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
    skill : {
        type : [String]
    }
},{
    timestamps : true,
});

userSchema.methods.getJWT = async function(){
    const user = this;
   const token = await Jwt.sign({_id : user._id}, "devMatch@25",{expiresIn:"1d"});
   return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordvalid = await bcrypt.compare(
       passwordInputByUser,
        passwordHash);
    return isPasswordvalid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
