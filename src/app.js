const express=require("express");
const app=express();
const connectDB=require("./config/database")
exports.app = app;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/" , authRouter , profileRouter , requestRouter );

connectDB()
.then(()=>{
    console.log("DB is connected successfully");
    app.listen(3000,()=>{
        console.log("Server is successfully listening on 3000   ");
    });
}).catch((err)=>{
    console.log("Failed to connect Database");
})









