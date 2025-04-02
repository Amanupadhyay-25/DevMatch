const express=require("express");
const app=express();
const connectDB=require("./config/database")
exports.app = app;
const User=require("./models/user");
const {validateSignUpdata} = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());
app.post("/signup", async (req,res) => {
    try{
        //Validation of Data 
        validateSignUpdata(req);

        //Encrypt the Password
        const { name , age, email , password} = req.body;
        const Passwordhash = await bcrypt.hash(password,10);
        console.log(Passwordhash);


        user = new User({
            name,
            email,
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

app.post("/login" , async (req,res)=>{
    try{
    const { email,password} = req.body;
    const user = await User.findOne({email : email });
        if(!user){
            throw new Error("InValid crediential");
    }

    //Comparing the Password
    const isPasswordvalid = await bcrypt.compare(password,user.password);
    if(isPasswordvalid){
        res.send("User logged in Successfully ");
    }else{
        throw new Error("InValid Crediential");
    }
}catch(err){
    res.status(400).send("ERROR:"+err.message);
}
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
     const Allowed_field = ["about" , skill]
    }catch(err){
        app.status(404).send("User not found");
    }
});

connectDB()
.then(()=>{
    console.log("DB is connected successfully");
    app.listen(3000,()=>{
        console.log("Server is successfully listening on 3000   ");
    });
}).catch((err)=>{
    console.log("Failed to connect Database");
})









