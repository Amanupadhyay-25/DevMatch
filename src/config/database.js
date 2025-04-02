const mongoose=require("mongoose");
const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://DevBond:AmandevMatch2025@namastenode.dhzxw.mongodb.net/devMatch?tls=true&tlsAllowInvalidCertificates=true");
}



module.exports=connectDB;
