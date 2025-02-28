const mongoose=require("mongoose");
const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://DevBond:Amandevbond%4025@namastenode.dhzxw.mongodb.net/devMatch");
}



module.exports=connectDB;
