const express = require("express");
const authRouter = express.Router();
const {validateSignUpdata} = require("../utils/validation");
const User=require("../models/user");
const bcrypt = require("bcrypt");
var Jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req,res) => {
    try{
        //Validation of Data 
        validateSignUpdata(req);

        //Encrypt the Password
        const { firstName , lastName, age, emailId , password} = req.body;
        const Passwordhash = await bcrypt.hash(password,10);
        console.log(Passwordhash);


        user = new User({
            firstName,
            lastName,
            emailId,
            age,
            password : Passwordhash
        });

        await user.save();
        res.send("User created successfully");
    }
    catch(err){
        res.status(400).send(" ERROR : " + err.message);
    }
    
})

authRouter.post("/login" , async (req,res)=>{
    try{
    const { emailId,password} = req.body;
    const user = await User.findOne({emailId : emailId });
        if(!user){
            throw new Error("InValid crediential");
    }

    //Comparing the Password
    const isPasswordvalid = await user.validatePassword(password);
    
    if(isPasswordvalid){
        // creating token
        const token = await user.getJWT();
        //Adding token to cookie and send back to client along with response
        res.cookie("token" , token,{expires:new Date(Date.now()+ 8*360000),httpOnly:true});
        res.send("User logged in Successfully ");
    }else{
        throw new Error("InValid Crediential");
    }
}catch(err){
    res.status(400).send("ERROR:"+err.message);
}
})

authRouter.post("/logout" , async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    });
    res.send("User logout successfully");
})

module.exports=authRouter;