const express=require("express");
const app=express();
const connectDB=require("./config/database")
exports.app = app;
const User=require("./models/user");


app.post("/signup", async (req,res) => {
    const user = new User({
        name: 'Khushi Sharma',
        email: 'khushi@gmail.com'
    })
    await user.save();
    res.send("User created successfully");
})

connectDB()
.then(()=>{
    console.log("DB is connected successfully");
    app.listen(3000,()=>{
        console.log("Server is successfully listening on 7777");
    });
}).catch((err)=>{
    console.log("Failed to connect Database");
})









