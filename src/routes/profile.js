const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view" , userAuth, async (req,res)=>{
     try {
        const user = req.user;
        res.send(user);
     }catch(err){
        res.status(400).send("ERROR : "+ err.message);
     }
})

profileRouter.patch("/profile/edit" ,userAuth,async(req,res)=>{
         try{
            if(!validateEditProfileData(req)){
               throw new Error("InValid Edit Request")
            }
            const loggedIn =req.user;
            console.log(loggedIn);
            Object.keys(req.body).forEach((key)=>(loggedIn[key]=req.body[key]));
            await loggedIn.save();
            res.json({
             message: `${loggedIn.firstName} , your profile updated successfully`,
             data : loggedIn,
            });
         }
         catch(err){
            res.status(400).send("ERROR:"+err.message);
         }
})

module.exports=profileRouter;