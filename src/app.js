const express=require("express");
const app=express();
app.listen(3000);


app.use("/khushi",(req,res)=>{
    res.send("Hello this side from server smjhee...ok bro");
});

app.use("/Aman",(req,res)=>{
    res.send("Hello from Aman Side !!");
});

app.use("/",(req,res)=>{
    res.send("Hello this side Khushieee....")
});