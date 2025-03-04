const express=require("express");
const app=express();
const connectDB=require("./config/database")
exports.app = app;
const User=require("./models/user");

app.use(express.json());
app.post("/signup", async (req,res) => {
    user = new User(req.body);
    await user.save();
    res.send("User created successfully");
})

app.use(express.json());
app.get("/user", async (req,res)=>{
  const emailId = req.body.email;
  try{
    const user = await User.find({});
    res.send(user);
  } catch(err){
      res.status(404).send("Something went wrong");
  }
});

app.delete("/user" , async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId)
        res.send("User is Deleted Successfully");
    }
    catch(err){
        res.status(404).send("User not Found");
    }
});

app.patch("/user" , async (req,res)=>{
    const userId = req.body.userId;
    const data= req.data;
    try{
        const user = await User.findByIdAndUpdate(userId,{name : "gautam gambhir" , email : "gautam@gmail.com"},{runValidators:true});
        res.send(" Yes data is updated Successfully ");
    }catch(err){
        app.status(404).send("User not found");
    }
});

connectDB()
.then(()=>{
    console.log("DB is connected successfully");
    app.listen(3000,()=>{
        console.log("Server is successfully listening on 7777");
    });
}).catch((err)=>{
    console.log("Failed to connect Database");
})









